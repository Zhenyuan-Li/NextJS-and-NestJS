# Used Car Pricing API

## Features

- Users sign up with email/password
- Users get an estimate for how much their car is worth based on the make/model/year/mileage
- Users can report wha they sold their vehicles for
- Admin have to approve reported sales.

## Structure

### 1) Create a mew user and sign in

- POST /auth/signup
- Body - {email, password}

### 2) Sign in as an existing user

- POST /auth/signin
- Body - {email, password}

### 3) Get an estimate for the cars value

- GET /reports
- Query String - make, model, year, mileage, longitude, latitude

### 4) Report how much a vehicle sold for

- POST /reports
- Body - {make, model, year, mileage, longitude, latitude, price}

### 5) Approve or reject a report submitted by a user

- PATCH /reports/:id
- Body - {approved}

### Extra (for practice purpose only):

1. Find a user with given id
   - GET /auth/:id
2. Find all users with given email
   - GET /auth?email=
3. Update a user with given id
   - PATCH /auth/:id; Body - {email, password}
4. Delete user with given id
   - DELETE /auth/:id

## Persisting Data with TypeORM

Nest works fine with ant ORM, but works well out of the box with TypeORM and Mongoose

### Connection

- AppModule -> Connection to SQLite DB
- UsersModule/ ReportsModule
  - User(Report) Entity: Lists the different properties that a User(Report) has (no functionality)
  - Users(Reports) Repository: Methods to find, update, delete, create a User(Report)

### Creating an Entity

1. Create an entity file, and create a class in it that lists all the properties that your entity will have.
2. Connect the entity to its parent module. This creates a repository
3. Connect the entity to the root connection (in app module)

### [Repository API](https://typeorm.io/#/repository-api)

There are always more ways to achieve the purpose

- create(): Makes a new instance of am entity, but does not persist it to the DB
- save(): Adds or updates a record to the DB
- find(): Runs a query and returns a list of entities
- findOne(): Run a query, returning the first record matching the search criteria.
- remove(): Remove a record from the DB

## Creating and saving user data

### Working flow

1. Request {email: 'a#a.com', password: 'aaa'}
2. Validation Pipe <- CreateUserDto (email: string, password: string)
3. UsersControllers: Defines routes + picks interesting data from incoming request
4. User Entity: Defines what a user is
   1. UsersService: Contains our real app logic
   2. UsersRepository: Created by TypeORM
5. SQLite DB

### Error Handling

Nest has other three types of Controller (HTTP, WebSocket, GRPC). BUT WebSocket & GRPC don't know how to handler a NotFoundException

## Customize data serialization

### Doc Recommended (flow is bidirectional)

e.g. Exclude password in response data

1. UserService - findOne()

UserEntityInstance: Directions on how to turn this instance of a class into a plain object

2. Users Controller - findUser()

Class Serializer Interceptor: Turns an instance of User Entity into a plain object based on some rules

3. Request GET /auth/2

#### Problem

We might turns out to have two routes: Admin and Public.

- Admin: {id, email, age, name} - Controller: findUserForAdmin()
- Public: {id, email} - Controller: findUser()

#### Solution

In step 2, we create a Custom Interceptor.

User DTO: that describes how to serialize a user for this particular handler.
One DTO for admin, One DTO for public

### Customize Interceptor

- Interceptors can mess around with incoming requests and/or outgoing responses.
- Interceptors can be applied to a single handler, all the handlers in a controller or globally

```ts
intercept(context: ExecutionContext, next: CallHandler)
```

- 'intercept' method is called automatically
- first param: Information on the incoming request
- second param: Kind of a reference to the request handler in our controller
