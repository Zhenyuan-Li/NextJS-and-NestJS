# S2 Messages

Store and retrieve messages stored in a plain JSON file

## Request

- Create a new message
  - POST localhost:3000/messages
  - {"content": "Hello World}
- Retrieve a list of all messages
  - GET localhost:3000/messages
- Retrieve a message with a particular ID
  - GET localhost:3000/messages/id

## Notes

- To create a new module. p.s. It will add Module at the end of directory name automatically

  `nest generate module messages`

- Generate a new controller through cli

  - `nest generate controller messages/messages --flat`
  - type of class to generate; Place the file in the messages folder/Call the class 'messages'; Don't create an extra folder called 'controllers'

- Pipe: Validate request data before it reaches a route handler (Controller)

  - ValidationPipe: Pipe built in to Nest to make validation super easy
    1. Use class-transformer to turn the body into an instance of the DTO class
    2. Use class-validator to validate the instance
    3. If there are errors, respond immediately, otherwise provide body to request handler

- Setting up Automatic Validation
  1. Tell Nest to use global validation
  2. Create a class that describes the different properties that the request body should have. (Data Transfer Object: Carries data between two place)
  3. Add validation rules to the class (check github repo of class-validation & class-transformer)
  4. Apply that class to the request handler

## Dependency Injection

- Inversion of Control Principle

  - Classes should not create instances of its dependencies on its own
  - Testing the apps will be far more easy...
  - Downside:

  ```ts
  const repo = new MessageRepo();
  const service = new MessageService(repo);
  const controller = new MessagesController(service);
  // This tons of classes is
  ```

- Nest DI Container/Injector

  - List of classes and their dependencies eg. MsgService -> MsgRepo
  - List of instances that I have created eg. return controller (only one instance will be created if multiple call)

- Flow
  1. At startup, register all classes with the container
  2. Container will figure out what each dependency each class has
  3. We the ask the container to create an instance of a class for us
  4. Container creates all required dependencies and gives us the instance
  5. Container will hold onto the create dependency instances and reuse them if needed

1-2 Use the 'Injectable' decorator on each class and add them to modules list of providers

3-4 Happens automatically - Nest will try to create controller instance for us
