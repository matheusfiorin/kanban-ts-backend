# Kanban TypeScript | Backend

> In order to see a portuguese version of this README, [click here]().

## Setup

### Dotenv file

Create a file at the rootdir called `.env`, following the content inside `.env.example`. You can tweak the `JWT_SECRET` and the `PORT` variable, and the `ADMIN_USER` and `ADMIN_PASS` corresponds to the challenge prerequisites.

### Building and running the application

In order to build the application, first install all the dependencies:

```console
$ npm install
```

Then, you can use the `build` script, described in `package.json`:

```console
$ npm run build
```

This will generate the `.js` files inside `dist/` directory. From this point you should be able to run the API by doing:

```console
$ npm run start
```

> Note that you could also use `npm run dev` to start a development environment that reloads everytime you update a file.

### Linting and testing

To do so, you can use those scripts:

```console
$ npm run lint
$ npm run test
```

## Decisions

### Language

About the language: firstly, I've chosen Typescript because it's a statically-typed language that provides type checking at compile-time, which helps to catch errors early in the development process and reduce the likelihood of runtime exceptions.

Secondly, Typescript has built-in support for async/await syntax and Promises, which can make asynchronous code easier to write and read - like in the `database` controller that I've written.

Thirdly, Typescript has excellent support for modern ECMAScript features, such as classes, modules, and arrow functions, which can help me write more concise and expressive code.

Finally, Typescript is a superset of Javascript, which means that existing Javascript code can be easily converted to Typescript without any major changes, allowing for easy integration with existing codebases.

### Architecture

I think that there's no right or wrong when it comes to architecture: it'll depend on the needs of the product, the team that is involved, and a sum of other factors. 

I chose to do this project with a Model-View-Controller (MVC) architecture with a few things in mind:

1. **Separation of Concerns**: MVC promotes a clear separation of responsibilities between components, making the application easier to develop, maintain and test.

2. **Scalability**: MVC architecture allows for a modular design, making it easier to add new features and scale the application.

3. **Reusability**: The modular nature of MVC makes components more reusable, saving development time and effort.

4. **Flexibility**: MVC architecture allows for a high degree of flexibility in terms of technologies and frameworks used.

5. **Easy Debugging and Exception Handling**: The clear separation of concerns and modularity of MVC make it easier to debug and handle exceptions, pinpoint errors and resolve them quickly.

### Dependencies

I've chosen a few of then, but I separate in some topics to differentiate better the **why's**:

#### Setup dependencies

- body-parser
- cors
- dotenv
- express

Those dependencies were lightweight and allowed me to create the first structure of the API really quick - but with the right amount of power.

#### Prerequisite dependencies

- joi
- jsonwebtoken
- uuid

Those dependencies helped me fulfill the challenge requirements with ease: validating the schema of entrance with `joi`, generating and verifying JWTs with `jsonwebtoken` and generating UUIDs with `uuid`.

#### Database dependency

- sqlite3

SQLite3 is a lightweight and easy-to-use library, making it simple to get started with database interaction. It's also serverless (which we can use `in-memory` really fast), cross-platform, widely used and has a high performance by design.

#### Development dependencies

All the dependencies in the `devDependencies` at the `package.json` was just to actually make the project work as I expect, but I just want to highlight the decision of choosing `tslint` for a lint - which helps a lot on keeping the same strategy and pattern when coding.
