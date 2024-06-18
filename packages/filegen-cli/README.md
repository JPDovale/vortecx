# Filegen CLI

Welcome to the Vortecx file generation CLI.

With the main goal of speeding up the creation of files with well-defined structures, Vortecx becomes indispensable in TypeScript projects that follow some object-oriented architecture.

## Getting Started

You should start by installing the library with `npm install -D @vortecx/filegen-cli`, then simply initiate your configuration with `npx filegen init`.

A file will appear at the root of your project, containing the configuration definition.

## Configuration

Essentially, you can define as many generators as you want in your configuration file.

Generators are divided into some essential parts with `name` and `type`, which are the only required properties for the proper functioning of the generator. `name` is the name of the class that will be created within the file, and `type` is a unique value used to identify the generator.

In the end, you will have a file like this.

```typescript
import { Config } from "@vortecx/filegen-cli";

export const config: Config = {
  generators: [
    {
      name: "test",
      type: "test",
    },
  ],
};
```

## Generating the First File

By defining these two **mandatory** parameters, you will be able to run the command `npx filegen generate {type} --module test --file create` in your terminal, where the value of `{type}` is the generator you want to use from your configuration file.

As a library that values clean architecture and is created with strong inspiration from NestJs, file separation is done in modules, and the module must be specified in the CLI execution with the `--module` or `-m` flag.

Another mandatory flag is `--file` or `-f`, which defines the name of the file that will be created in your file explorer.

The `generate` command can be abbreviated to `gen` or just `g`.

After using the above command, using `npx filegen g test -m test -f create`, you will have a folder structure like this:

```
root
|-- test
|   |-- test
|       |-- create.spec.ts
|       |-- create.ts
```

Along with the following files:

```typescript
// create.ts
export class test {
  constructor() {}
}
```

```typescript
// create.spec.ts
import { test } from "./create";

let sut: test;

describe("test", async () => {
  beforeEach(async () => {
    sut = new test();
  });

  it("should ...", async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

This way, you can already create files in a somewhat more automated manner. However, our CLI doesn't stop there, as folder structure is commonly more complex than this.

## Specifying Configurations

First and foremost, it is important to specify how some creation patterns are established in our configuration file.

An interesting demonstration is that we commonly create class names in PascalCase, unlike what was shown above.

For this definition, we can add something like the following to the `name` property of our generator:

```typescript
import { Config } from "@vortecx/filegen-cli";

export const config: Config = {
  generators: [
    {
      name: "-{^file}-",
      type: "test",
    },
  ],
};
```

Setting the property `-{^file}-` in the `name` field will make the generated class name in the file take the value provided after the `--file` flag, but using PascalCase with the first letter capitalized.

Example:
For the input `npx filegen g test -m test -f create`, we will get the following structure:

```
root
|-- Create
|   |-- test
|       |-- create.spec.ts
|       |-- create.ts
```

And the generated files will be, respectively:

```typescript
// create.ts
export class Create {
  constructor() {}
}
```

```typescript
// create.spec.ts
import { Create } from "./create";

let sut: Create;

describe("Create", async () => {
  beforeEach(async () => {
    sut = new Create();
  });

  it("should ...", async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

This opens up a range of possibilities.

## Possible Patterns

| Syntax        | Description                                                                                                                      | EX: Input | EX: Output |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| -{module}-    | The substitution value will be retrieved from the `--module` or `-m` flag                                                        | test      | test       |
| -{^module}-   |                                                                                                                                  | test      | Test       |
| -{^^module}-  |                                                                                                                                  | test      | TEST       |
| -{modules}-   | The substitution value will be retrieved from the `--plural` or `-p` flag, but it not defined is automatically set as module + s | test      | tests      |
| -{^modules}-  |                                                                                                                                  | test      | Tests      |
| -{^^modules}- |                                                                                                                                  | test      | TESTS      |
| -{name}-      | The substitution value will be retrieved from the `name` property defined in the configuration file                              | test      | test       |
| -{^name}-     |                                                                                                                                  | test      | Test       |
| -{^^name}-    |                                                                                                                                  | test      | TEST       |
| -{file}-      | The substitution value will be retrieved from the `--file` or `-f` flag                                                          | test      | test       |
| -{^file}-     |                                                                                                                                  | test      | Test       |
| -{^^file}-    |                                                                                                                                  | test      | TEST       |
| -{type}-      | The substitution value will be retrieved from the `type` property defined in the configuration file                              | test      | test       |
| -{^type}-     |                                                                                                                                  | test      | Test       |
| -{^^type}-    |                                                                                                                                  | test      | TEST       |

These are the main patterns for constructing paths or names, and you can use them concatenated in something like `name: '-{^file}--{^module}--{^type}-'` where, for the configuration

```typescript
import { Config } from "@vortecx/filegen-cli";

export const config: Config = {
  generators: [
    {
      name: "-{^file}--{^module}--{^type}-",
      type: "service",
    },
  ],
};
```

the command `npx filegen g service -m user -f create` would result in:<br>

1> _**Folder Structure**_ <br>

```
root
|-- CreateUserService
|   |-- user
|       |-- create.spec.ts
|       |-- create.ts
```

2> _**Files**_:

```typescript
// create.ts
export class CreateUserService {
  constructor() {}
}
```

```typescript
// create.spec.ts
import { CreateUserService } from "./create";

let sut: CreateUserService;

describe("CreateUserService", async () => {
  beforeEach(async () => {
    sut = new CreateUserService();
  });

  it("should ...", async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

However, much of the folder structure needs to be changed, as it makes no sense to have a folder called `CreateUserService` directly in the root of the project. So, let's go through a few more tricks.

## Advanced Settings

We don't want to slow anyone down, so the CLI doesn't provide too much guidance on how you should structure your folder. For this reason, it is highly flexible and open to all kinds of possibilities.

To showcase this flexibility, we will present all the configurations that can be made in the generators.

| Property    | Description                                                                                                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | Sets the main name of the generator                                                                                                                                                                             |
| type        | Definition of the generator's identity                                                                                                                                                                          |
| pattern     | Definition of the folder where the file will be generated                                                                                                                                                       |
| alias       | Definition of a shortcut for the command, making it unnecessary to type the entire search key. Considering a type: 'service,' and an alias: 's,' you can replace `npx filegen g service` with `npx filegen g s` |
| filename    | Granular definition of what the generated file's name will be                                                                                                                                                   |
| test        | Defines the type of test file to be generated, allowing you to disable them if necessary                                                                                                                        |
| annotations | Array of strings defining annotations for the file's class                                                                                                                                                      |
| imports     | Array defining what should be imported. More on **<a href='#imports'>Imports</a>**                                                                                                                              |
| extends     | Array defining the extension of the generated class. More on **<a href='#extensions'>Extensions</a>**                                                                                                           |
| implements  | Array defining the implementation of the generated class. More on **<a href='#implementations'>Implementations</a>**                                                                                            |
| interfaces  | Array defining the interfaces to be created in the file. More on **<a href='#interfaces'>Interfaces</a>**                                                                                                       |
| types       | Array defining the types to be created in the file. More on **<a href='#types'>Types</a>**                                                                                                                      |
| methods     | Array defining the methods to be created in the generated class in the file. More on **<a href='#methods'>Methods</a>**                                                                                         |

### Generic Types

| property | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| name     | Definition of the name of the typing that will receive generic types                  |
| generics | Array defining generic typing. More on **<a href='#generic-types'>Generic Types</a>** |

### Imports

| property | Description                                  |
| -------- | -------------------------------------------- |
| imports  | Array defining what will be imported         |
| from     | Definition of where it will be imported from |

### Extensions

| property | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| name     | Definition of the name of the typing to be extended                                   |
| generics | Array defining generic typing. More on **<a href='#generic-types'>Generic Types</a>** |

### Implementations

| property | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| name     | Definition of the name of the typing to be implemented                                |
| generics | Array defining generic typing. More on **<a href='#generic-types'>Generic Types</a>** |

### Interfaces

| property | Description                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------- |
| name     | Definition of the name to be given to the interface                                             |
| export   | Boolean definition of interface exportation                                                     |
| extends  | Array defining the extension of the interface. More on **<a href='#extensions'>Extensions</a>** |
| pattern  | Naming pattern to be generated for the interface                                                |

### Types

| property | Description                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------- |
| name     | Definition of the name to be given to the typing                                                          |
| export   | Boolean definition of typing exportation                                                                  |
| receive  | Array defining types to be assigned to the typing. More on **<a href='#generic-types'>Generic Types</a>** |
| pattern  | Naming pattern to be generated for the typing                                                             |

### Methods

| property    | Description                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| name        | Definition of the name to be given to the method                                                         |
| annotations | Array of annotations to be added to the method                                                           |
| properties  | Array defining properties to be received by the method. More on **<a href='#properties'>Properties</a>** |
| returns     | Method return. More on **<a href='#return'>Return</a>**                                                  |

### Properties

| property   | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- |
| name       | Definition of the name to be given to the property                                                |
| annotation | Definition of annotation assigned to the property                                                 |
| type       | Array of types associated with properties. More on **<a href='#generic-types'>Generic Types</a>** |

### Return

| property | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| type     | Array of types associated with the return. More on **<a href='#generic-types'>Generic Types</a>** |

It's worth noting that, except for the `type` property, all others can be defined using conversion patterns, making it possible to add imports, typings, interfaces, methods, etc., with standardized names.

## Multiple File Generation

You can generate multiple files at once using the command `npx filegen multi-generate --generators service,controller,gateway --module user --file create`.

Clearly, the generators `service, controller, gateway` must be defined in your configuration file. If you have aliases, you can use them.

The `multi-generate` command can be abbreviated to `mgen` or just `mg`, and the `--generators` flag can be replaced with `-g`, which is mandatory for this command.

## Standard Plugins

Some plugins are provided as standard by the CLI for use in specific types of projects. For example, generation plugins for use with Prisma ORM and NestJS...
Another standard plugin is the infrastructure file generation plugin.

You can use these plugins by adding them respectively to your configuration file.
NOTE: For these to work properly, you should add an array that defines the existing modules in your project.

```typescript
import { Config } from "@vortecx/filegen-cli";

export const config: Config = {
  modules: ["user", ["company", "companies"], "product", "market"],
  plugins: ["infraGenerators", "nestGenerators", "prismaGenerators"],
};
```

Some of these plugins contain initializers for files that use these plugins. You can initialize them with `npx filegen startPlugins`, `npx filegen srtp`, or `npx filegen sp`.

## Modules

The modules array can be defined as just a string, or as an array containing two strings, with the first being the module name in singular and the second in plural. In the case of a single string, the plural name of the module will be considered as the received value followed by the addition of an 's' at the end.

By defining the modules in your configuration file, you can simply execute `npx filegen` in your integrated terminal... This will run the CLI in a more user-friendly way, allowing for a multiple selection of both the modules for generation and the generators to be used, bringing greater ease in executing the commands.

## Questions?

Feel free to open an issue on our GitHub repository. It will be a pleasure to contribute to your progress!

## Continuation...

If there's more you would like to translate or discuss, please feel free to continue. I'm here to help!
