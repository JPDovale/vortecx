# Cli Forger

- <a href="#introduction">Introduction</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#basics">Basics</a>
  - <a href="#starting-a-new-cli">Starting a new CLI</a>
  - <a href="#adding-commands">Adding Commands</a>
  - <a href="#commands-with-parameters">Commands with Parameters</a>
- <a href="#workers">Workers</a>
  - <a href="#figures">Figures</a>
    - <a href="#common">Common</a>
    - <a href="#special">Special</a>
    - <a href="#fallback-special">Fallback Special</a>
  - <a href="#files">Files</a>
    - <a href="#file">File</a>
    - <a href="#create-file">Create file</a>
    - <a href="#exists-file">Exists file</a>
    - <a href="#read-file">Read file</a>
  - <a href="#folders">Folders</a>
    - <a href="#create-folder-if-not-exists">Create folder if not exists</a>
    - <a href="#exists-folder">Exists folder</a>
  - <a href="#logger">Logger</a>
    - <a href="#log-error">Log error</a>
    - <a href="#log-info">Log info</a>
    - <a href="#log">Log</a>
    - <a href="#exit-logger">Exit logger</a>
      - <a href="#exit-log-error">Exit log error</a>
      - <a href="#exit-log-info">Exit log info</a>
      - <a href="#exit-log">Exit log</a>
  - <a href="#path">Path</a>
    - <a href="#get-current-path">Get current path</a>
    - <a href="#get-path">Get path</a>
  - <a href="#prompt">Prompt</a>
  - <a href="#templates">Templates</a>


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
|-- tsconfig.json
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

// when creating our command, we pass a generic type with 
// the parameters that will exist
const getAgeOfHeroByNameCommand = Command.create<{
  name: string;
}>({
  name: "Get age of hero",
  description: "Fetches a hero's age by name",
  aliases: ["gah"],
  // Here we add an Option that declares the existence of the parameter,
  // note that the long parameter of the option is the same that will 
  // be returned so use the same for the generic type above
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

## Workers

Workers are a widely-used command framework in ready-to-use CLIs, leveraging validations, logging, and usability.

Workers are defined in various areas of operation.


### Figures

A vast array of symbols used in modern CLI construction. It's worth noting that not all terminals support the figures defined here, so some symbols may differ or even fail to render in certain environments.

#### Common

| Name                                  | Figure                |
|---------------------------------------|-----------------------|
| circleQuestionMark                    | (?)                   |
| questionMarkPrefix                    | (?)                   |
| square                                | █                     |
| squareDarkShade                       | ▓                     |
| squareMediumShade                     | ▒                     |
| squareLightShade                      | ░                     |
| squareTop                             | ▀                     |
| squareBottom                          | ▄                     |
| squareLeft                            | ▌                     |
| squareRight                           | ▐                     |
| squareCenter                          | ■                     |
| bullet                                | ●                     |
| dot                                   | ․                     |
| ellipsis                              | …                     |
| pointerSmall                          | ›                     |
| triangleUp                            | ▲                     |
| triangleUpSmall                       | ▴                     |
| triangleDown                          | ▼                     |
| triangleDownSmall                     | ▾                     |
| triangleLeftSmall                     | ◂                     |
| triangleRightSmall                    | ▸                     |
| home                                  | ⌂                     |
| heart                                 | ♥                     |
| musicNote                             | ♪                     |
| musicNoteBeamed                       | ♫                     |
| arrowUp                               | ↑                     |
| arrowDown                             | ↓                     |
| arrowLeft                             | ←                     |
| arrowRight                            | →                     |
| arrowLeftRight                        | ↔                     |
| arrowUpDown                           | ↕                     |
| almostEqual                           | ≈                     |
| notEqual                              | ≠                     |
| lessOrEqual                           | ≤                     |
| greaterOrEqual                        | ≥                     |
| identical                             | ≡                     |
| infinity                              | ∞                     |
| subscriptZero                         | ₀                     |
| subscriptOne                          | ₁                     |
| subscriptTwo                          | ₂                     |
| subscriptThree                        | ₃                     |
| subscriptFour                         | ₄                     |
| subscriptFive                         | ₅                     |
| subscriptSix                          | ₆                     |
| subscriptSeven                        | ₇                     |
| subscriptEight                        | ₈                     |
| subscriptNine                         | ₉                     |
| oneHalf                               | ½                     |
| oneThird                              | ⅓                     |
| oneQuarter                            | ¼                     |
| oneFifth                              | ⅕                     |
| oneSixth                              | ⅙                     |
| oneEighth                             | ⅛                     |
| twoThirds                             | ⅔                     |
| twoFifths                             | ⅖                     |
| threeQuarters                         | ¾                     |
| threeFifths                           | ⅗                     |
| threeEighths                          | ⅜                     |
| fourFifths                            | ⅘                     |
| fiveSixths                            | ⅚                     |
| fiveEighths                           | ⅝                     |
| sevenEighths                          | ⅞                     |
| line                                  | ─                     |
| lineBold                              | ━                     |
| lineDouble                            | ═                     |
| lineDashed0                           | ┄                     |
| lineDashed1                           | ┅                     |
| lineDashed2                           | ┈                     |
| lineDashed3                           | ┉                     |
| lineDashed4                           | ╌                     |
| lineDashed5                           | ╍                     |
| lineDashed6                           | ╴                     |
| lineDashed7                           | ╶                     |
| lineDashed8                           | ╸                     |
| lineDashed9                           | ╺                     |
| lineDashed10                          | ╼                     |
| lineDashed11                          | ╾                     |
| lineDashed12                          | −                     |
| lineDashed13                          | –                     |
| lineDashed14                          | ‐                     |
| lineDashed15                          | ⁃                     |
| lineVertical                          | │                     |
| lineVerticalBold                      | ┃                     |
| lineVerticalDouble                    | ║                     |
| lineVerticalDashed0                   | ┆                     |
| lineVerticalDashed1                   | ┇                     |
| lineVerticalDashed2                   | ┊                     |
| lineVerticalDashed3                   | ┋                     |
| lineVerticalDashed4                   | ╎                     |
| lineVerticalDashed5                   | ╏                     |
| lineVerticalDashed6                   | ╵                     |
| lineVerticalDashed7                   | ╷                     |
| lineVerticalDashed8                   | ╹                     |
| lineVerticalDashed9                   | ╻                     |
| lineVerticalDashed10                  | ╽                     |
| lineVerticalDashed11                  | ╿                     |
| lineDownLeft                          | ┐                     |
| lineDownLeftArc                       | ╮                     |
| lineDownBoldLeftBold                  | ┓                     |
| lineDownBoldLeft                      | ┒                     |
| lineDownLeftBold                      | ┑                     |
| lineDownDoubleLeftDouble              | ╗                     |
| lineDownDoubleLeft                    | ╖                     |
| lineDownLeftDouble                    | ╕                     |
| lineDownRight                         | ┌                     |
| lineDownRightArc                      | ╭                     |
| lineDownBoldRightBold                 | ┏                     |
| lineDownBoldRight                     | ┎                     |
| lineDownRightBold                     | ┍                     |
| lineDownDoubleRightDouble             | ╔                     |
| lineDownDoubleRight                   | ╓                     |
| lineDownRightDouble                   | ╒                     |
| lineUpLeft                            | ┘                     |
| lineUpLeftArc                         | ╯                     |
| lineUpBoldLeftBold                    | ┛                     |
| lineUpBoldLeft                        | ┚                     |
| lineUpLeftBold                        | ┙                     |
| lineUpDoubleLeftDouble                | ╝                     |
| lineUpDoubleLeft                      | ╜                     |
| lineUpLeftDouble                      | ╛                     |
| lineUpRight                           | └                     |
| lineUpRightArc                        | ╰                     |
| lineUpBoldRightBold                   | ┗                     |
| lineUpBoldRight                       | ┖                     |
| lineUpRightBold                       | ┕                     |
| lineUpDoubleRightDouble               | ╚                     |
| lineUpDoubleRight                     | ╙                     |
| lineUpRightDouble                     | ╘                     |
| lineUpDownLeft                        | ┤                     |
| lineUpBoldDownBoldLeftBold            | ┫                     |
| lineUpBoldDownBoldLeft                | ┨                     |
| lineUpDownLeftBold                    | ┥                     |
| lineUpBoldDownLeftBold                | ┩                     |
| lineUpDownBoldLeftBold                | ┪                     |
| lineUpDownBoldLeft                    | ┧                     |
| lineUpBoldDownLeft                    | ┦                     |
| lineUpDoubleDownDoubleLeftDouble      | ╣                     |
| lineUpDoubleDownDoubleLeft            | ╢                     |
| lineUpDownLeftDouble                  | ╡                     |
| lineUpDownRight                       | ├                     |
| lineUpBoldDownBoldRightBold           | ┣                     |
| lineUpBoldDownBoldRight               | ┠                     |
| lineUpDownRightBold                   | ┝                     |
| lineUpBoldDownRightBold               | ┡                     |
| lineUpDownBoldRightBold               | ┢                     |
| lineUpDownBoldRight                   | ┟                     |
| lineUpBoldDownRight                   | ┞                     |
| lineUpDoubleDownDoubleRightDouble     | ╠                     |
| lineUpDoubleDownDoubleRight           | ╟                     |
| lineUpDownRightDouble                 | ╞                     |
| lineDownLeftRight                     | ┬                     |
| lineDownBoldLeftBoldRightBold         | ┳                     |
| lineDownLeftBoldRightBold             | ┯                     |
| lineDownBoldLeftRight                 | ┰                     |
| lineDownBoldLeftBoldRightBold         | ┱                     |
| lineDownBoldLeftRightBold             | ┲                     |
| lineDownLeftRightBold                 | ┮                     |
| lineDownLeftBoldRight                 | ┭                     |
| lineDownDoubleLeftDoubleRightDouble   | ╦                     |
| lineDownDoubleLeftRight               | ╥                     |
| lineDownLeftDoubleRightDouble         | ╤                     |
| lineUpLeftRight                      | ┴                      |
| lineUpBoldLeftBoldRightBold          | ┻                      |
| lineUpLeftBoldRightBold              | ┷                      |
| lineUpBoldLeftRight                 | ┸                      |
| lineUpBoldLeftBoldRightBold         | ┹                      |
| lineUpBoldLeftRightBold             | ┺                      |
| lineUpLeftRightBold                 | ┶                      |
| lineUpLeftBoldRight                 | ┵                      |
| lineUpDoubleLeftDoubleRightDouble   | ╩                      |
| lineUpDoubleLeftRight               | ╨                      |
| lineUpLeftDoubleRightDouble         | ╧                      |
| lineUpDownLeftRight                 | ┼                      |
| lineUpBoldDownBoldLeftBoldRightBold | ╋                      |
| lineUpDownBoldLeftBoldRightBold     | ╈                      |
| lineUpBoldDownLeftBoldRightBold     | ╇                      |
| lineUpBoldDownBoldLeftRightBold     | ╊                      |
| lineUpBoldDownBoldLeftBoldRight     | ╉                      |
| lineUpBoldDownLeftRight             | ╀                      |
| lineUpDownBoldLeftRight             | ╁                      |
| lineUpDownLeftBoldRight             | ┽                      |
| lineUpDownLeftRightBold             | ┾                      |
| lineUpBoldDownBoldLeftRight         | ╂                      |
| lineUpDownLeftBoldRightBold         | ┿                      |
| lineUpBoldDownLeftBoldRight         | ╃                      |
| lineUpBoldDownLeftRightBold         | ╄                      |
| lineUpDownBoldLeftBoldRight         | ╅                      |
| lineUpDownBoldLeftRightBold         | ╆                      |
| lineUpDoubleDownDoubleLeftDoubleRightDouble | ╬             |
| lineUpDoubleDownDoubleLeftRight     | ╫                      |
| lineUpDownLeftDoubleRightDouble     | ╪                      |
| lineCross                            | ╳                     |
| lineBackslash                        | ╲                     |
| lineSlash                            | ╱                     |

#### Special

| Name                 | Figure   |
|----------------------|----------|
| tick                 | ✔        |
| info                 | ℹ        |
| warning              | ⚠        |
| cross                | ✘        |
| squareSmall          | ◻        |
| squareSmallFilled    | ◼        |
| circle               | ◯        |
| circleFilled         | ◉        |
| circleDotted         | ◌        |
| circleDouble         | ◎        |
| circleCircle         | ⓞ        |
| circleCross          | ⓧ        |
| circlePipe           | Ⓘ        |
| radioOn              | ◉        |
| radioOff             | ◯        |
| checkboxOn           | ☒        |
| checkboxOff          | ☐        |
| checkboxCircleOn     | ⓧ        |
| checkboxCircleOff    | Ⓘ        |
| pointer              | ❯        |
| triangleUpOutline    | △        |
| triangleLeft         | ◀        |
| triangleRight        | ▶        |
| lozenge              | ◆        |
| lozengeOutline       | ◇        |
| hamburger            | ☰        |
| smiley               | ㋡        |
| mustache             | ෴        |
| star                 | ★        |
| play                 | ▶        |
| nodejs               | ⬢        |
| oneSeventh           | ⅐        |
| oneNinth             | ⅑        |
| oneTenth             | ⅒        |

#### Fallback Special

| Name                 | Figure   |
|----------------------|----------|
| tick                 | √        |
| info                 | i        |
| warning              | ‼        |
| cross                | ×        |
| squareSmall          | □        |
| squareSmallFilled    | ■        |
| circle               | ( )      |
| circleFilled         | (*)      |
| circleDotted         | ( )      |
| circleDouble         | ( )      |
| circleCircle         | (○)      |
| circleCross          | (×)      |
| circlePipe           | (│)      |
| radioOn              | (*)      |
| radioOff             | ( )      |
| checkboxOn           | [×]      |
| checkboxOff          | [ ]      |
| checkboxCircleOn     | (×)      |
| checkboxCircleOff    | ( )      |
| pointer              | >        |
| triangleUpOutline    | ∆        |
| triangleLeft         | ◄        |
| triangleRight        | ►        |
| lozenge              | ♦        |
| lozengeOutline       | ◊        |
| hamburger            | ≡        |
| smiley               | ☺        |
| mustache             | ┌─┐     |
| star                 | ✶        |
| play                 | ►        |
| nodejs               | ♦        |
| oneSeventh           | 1/7      |
| oneNinth             | 1/9      |
| oneTenth             | 1/10     |

### Files

#### File

The `File` object is the cornerstone of the file worker. It comes in two types: `json` and `text`. In its instance, it holds the file path (`path`), raw content (`rawContent`), type (either `json` or `text`), and JSON content (`jsonContent`), which exists only in JSON files.

Instances of `File` can use the `get` method to fetch information from the file and `set` to modify it.

Assuming the following JSON is saved at the fictitious path `/home/user/person.json` with the content:

```json
{
  "name": "John Doe",
  "age": "32",
  "address": {
    "city": "New York",
    "country": "USA"
  }
}
```

You can read this file using:

```typescript
const user = workers.files.read(['/home', 'user', 'person.json']) // or '/home/user/person.json'

// Fetching the name
const name = user.get("name")
console.log(name) // "John Doe"

// Fetching the address
const address = user.get("address")
console.log(address) // "{ "city": "New York", "country": "USA" }"

// Accessing just the city
const city = user.get("address.city")
console.log(city) // "New York"

// For modifications, similar access is used,
// noting that the content is passed first.
// Let's change the city, for example:

user.set("Ohio", "address.city")
const updatedCity = user.get("address.city")
console.log(updatedCity) // "Ohio"

// To persist changes:
user.save()
```

Or, alternatively:

```typescript
const userResult = workers.files.read('/home/user/person.json')

// This returns a string with the raw content
const userString: string = userResult.get()

// Parse the content into a JS object
const user = JSON.parse(userString)

// Modify the content directly
user.address.city = "Los Angeles"

// Save the changes to the file
userResult.set(user)
userResult.save()
```

#### Create file

This function creates a `File` object instance with the specified content and immediately saves it to the specified location. If the file already exists, it logs an error message and exits. You can continue editing the `File` instance as needed, and once satisfied, call `file.save()` to persist the changes to disk.

#### Exists file

Checks if a file exists at the specified path.

#### Read file

Reads the specified path and returns a `File` object instance.

### Folders

#### Create folder if not exists

Creates a folder if it does not already exist. If the folder exists, the default behavior is to log an error message and exit. This behavior can be adjusted using options in the path object.

#### Exists folder

Checks if a folder exists at the specified path.

### Logger

#### Log error

Displays an error message in red with the prefix "[ERROR]".

#### Log info

Displays an info message in blue with the prefix "[INFO]".

#### Log

Displays a message.

#### Exit logger

##### Exit log error

Displays an error message in red with the prefix "[ERROR]" and terminates the process.

##### Exit log info

Displays an info message in blue with the prefix "[INFO]" and terminates the process.

##### Exit log

Displays a message and terminates the process.

### Path

#### Get current path

Accesses the current execution path of the program.

#### Get path

Accesses a path, which can be a combination of strings in an array or a single string.