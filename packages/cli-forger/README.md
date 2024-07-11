# Cli Forger

- <a href="#introduction">Introduction</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#basics">Basics</a>
  - <a href="#starting-a-new-cli">Starting a new CLI</a>
  - <a href="#adding-commands">Adding Commands</a>

## Introduction

Welcome to Vortecx's CLI creator.

This application is a TypeScript-based framework built on object-oriented principles. We aim to create an environment where creating CLIs is as simple as pushing to an array.

## Getting Started

To get started, you can run `npx @vortecx/cli-forger` in your terminal and wait for the magic to happen.

This command will initiate a new project using the CLI Forger. Once finished, you will find a folder structure like:

```
root
|-- .git
|-- node_modules
|-- src
| |-- cli.ts
| |-- index.ts
|-- .eslintrc
|-- .gitignore
|-- .npmrc
|-- package-lock.json
|-- package.json
|-- tsconfig.jsos
```

Running `npm run build && npm link` will enable you to execute your CLI with the project name you chose. Just like that, you can create a CLI.

## Basics

### Starting a new CLI

To create a CLI with CLI Forger is very simple... First, you will initiate a new instance of CLI Forger in your `src/cli.ts` file and export it as default. (If you used the `npx @vortecx/cli-forger` command, you will see something like this ready in that file)

```typescript
// src/cli.ts
import { CliForger } from "@vortecx/cli-forger";
import { version } from "../package.json";

const cli = new CliForger({
  name: "heros",
  version,
  description: "The greatest legends of the world",
});

export default cli;
```

In your `src/index.ts` file, you will mark it as executable and use node for it, then use the CLI execution command. Here is an example:

```typescript
// src/index.ts
#!/usr/bin/env node
'use strict'

import cli from './cli'

cli.run(process.argv)
```

With this, just build and link using the command `npm run build && npm link` and your CLI will be ready for use. However, a CLI without commands is not useful, is it?

### Adding Commands

To add a command is very simple. Let's start by creating a command.

```typescript
// src/cli.ts
import { Command } from "@vortecx/cli-forger";

const listHerosCommand = Command.create({
  name: "List heroes",
  description: "Displays registered heroes",
  aliases: ["lh"],
});
// With the command created, we can add a handler to it.

const heroes = [
  { name: "Iron Man", age: 32 },
  { name: "Captain America", age: 120 },
  { name: "Spider-Man", age: 17 },
  // ...
];

listHerosCommand.addHandler(() => {
  for (const hero of heroes) {
    console.log(hero.name);
  }
});
// With the handler added, we can finally add the command to our CLI

cli.addCommand(listHerosCommand);
```

### Commands with Parameters

To add parameters to commands is very simple… In our fictional CLI, we will fetch the age of a hero by name.

Let's start by creating a command.

```typescript
// src/cli.ts
import { Command, Option } from "@vortecx/cli-forger";

// when creating our command, we pass a generic type with the parameters that will exist
const getAgeOfHeroByNameCommand = Command.create<{
  name: string;
}>({
  name: "Get age of hero",
  description: "Fetches a hero's age by name",
  aliases: ["gah"],
  // Here we add an Option that declares the existence of the parameter,
  // note that the long parameter of the option is the same that will be returned
  // so use the same for the generic type above
  options: [
    Option.create({
      name: "Name of hero",
      description: "Defines the name for the search",
      long: "name",
      short: "n",
      required: true,
    }),
  ],
});

// With the command created, we can add a handler to it.
const heroes = [
  { name: "Iron Man", age: 32 },
  { name: "Captain America", age: 120 },
  { name: "Spider-Man", age: 17 },
  // ...
];

getAgeOfHeroByNameCommand.addHandler(({ args, workers }) => {
  // Retrieve the argument defined in option.
  // It's important to validate the existence of the parameter
  // because even when marked as required
  // this is not automatically validated
  const { name } = args;

  if (!name) {
    workers.logger.exit.error("The name is required");
  }

  const hero = heroes.find((h) => h.name === name);

  if (!hero) {
    workers.logger.info("The hero does not exist");
    return;
  }

  workers.logger.log("The hero's age is: ", hero.age);
});
// With the handler added, we can finally add the command to our CLI

cli.addCommand(getAgeOfHeroByNameCommand);
```

```

```