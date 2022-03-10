# NestJS: The Complete Developer's Guide

## S1 The basics of nest

As for server, Nest has tools to help us write theses:

- **Pipe**: Validate data contained in the request
- **Guard**: Make sure the user is authenticated
- **Controller**: Route the request to a particular function
- **Services**: Run some business logic
- **Repository**: Access a database

## Naming convention

- One class per file (some exceptions)
- Class names should include the kind of thing we are creating
- Name of class and name of file should always match up
- Filename template: name._type_of_thing_.ts

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
