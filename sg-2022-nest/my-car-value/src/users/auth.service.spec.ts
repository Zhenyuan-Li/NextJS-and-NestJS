import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  // No type support (like resolve number in find()), using Partial to help with that.
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // 1. Create a fake copy of the users service
    // Only create find() and create() is because AuthService only use these two
    fakeUserService = {
      // Promise.resolve() to mimic the async & await
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        // without casting, we missed the hooks (logInsert...)
        Promise.resolve({ id: 1, email, password } as User),
    };

    // 2. Create a test module for Auth
    const module = await Test.createTestingModule({
      providers: [
        // List of things we want to register in our testing DI container
        AuthService,
        // Re-route the DI system: If anyone asks for UserService, give them this object
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a slated and hashed password', async () => {
    const user = await service.signup('a@a.com', 'a');
    expect(user.password).not.toEqual('a');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined;
    expect(hash).toBeDefined;
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // mock there already a user exists
    fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@test.com', password: 'test' } as User,
      ]);
    try {
      await service.signup('a@a.com', 'aaa');
    } catch (err) {
      expect(err.message).toMatch('email is in use');
      return;
    }
    throw new TypeError('cannot get email error');
  });
});
