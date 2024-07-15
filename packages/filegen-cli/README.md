# Filegen CLI

Welcome to the Vortecx template-based file generator. In many projects, following a consistent code structure is crucial for maintenance. These structures, known as Patterns, often lead to repeated code elements. While some of these repetitions can't be abstracted into functions or other patterns, automation can still be applied.

In certain backend projects using object-oriented programming, I frequently encounter declarations for `service`, `controller`, `repository`, `test`, `entity`, and more. These are all usually linked to a specific functionality with a basic structure. Wouldn't it be great if we could generate all of these at once? Well, we can.

## Getting Started

To begin, install the CLI and initiate the configuration with `npm install --save-dev @vortecx/filegen-cli`. Then, run `npx fgen init` to start the setup. A file like this should appear at the root of your project:

```typescript
// fgen.ts
import { Config } from "@vortecx/filegen-cli";

// Let's add some modules
export const config: Config = {
  modules: [
    {
      name: "user",
      // For names that don't simply become plural by adding an 's',
      // define an array with the singular and plural forms
      types: ["controller", "service", ["repository", "repositories"]],
    },
    {
      name: ["company", "companies"],
      types: ["controller", "service", "presenter", "gateway"],
      ext: "js", // (optional) default is 'ts'
    },
  ],
};
```

With the modules created, you can set up the templates using `npx fgen mold`. This command will create a new folder named ".vortecx" at the root of your project, containing your templates. The templates are divided into header and body sections.

Everything before the `---` line is the header, and below it is the content that will be inserted into the file. You can change the file's location and name right after `->`, using some substitution patterns.

Possible Patterns:
| Syntax | Description | EX: Input | EX: Output |
| ------------- | --------------------------------------------------------------------------- | --------- | ---------- |
| {{module}} | Will be replaced by the value of `name` for each module | test | test |
| {{Module}} | | test | Test |
| {{MODULE}} | | test | TEST |
| {{modules}} | The module name + 's' or the second parameter of the array passed to `name` | test | tests |
| {{Modules}} | | test | Tests |
| {{MODULES}} | | test | TESTS |
| {{name}} | Value entered during the interactive command | test | test |
| {{Name}} | | test | Test |
| {{NAME}} | | test | TEST |
| {{type}} | The type of file being generated | test | test |
| {{Type}} | | test | Test |
| {{TYPE}} | | test | TEST |
| {{ext}} | | js | js |

These are all the parameters passed to the template. Some, like `name`, are obtained during the generator's execution with `npx fgen gen`, which will prompt a selector to choose the name, modules, and types to generate.

### Examples

Suppose you need a `controller` and a `service` for user creation. Define the `user` module in the `fgen.ts` configuration with the types `service` and `controller`:

```typescript
import { Config } from "@vortecx/filegen-cli";

export const config: Config = {
  modules: [
    {
      name: "user",
      types: ["controller", "service"],
    },
  ],
};
```

After running `npx fgen mold`, the templates will appear in their respective folders within `.vortex/fgen/{{module}}/{{type}}/index.vort`. Let's take a closer look at one of these files, specifically the `service` template, assuming we want to export a service class:

```typescript
folder->src/{{module}}/{{type}}/
filename->{{name}}.{{type}}.{{ext}}
---
import { Injectable } from '@nest/common'
import { {{Modules}}Repository } from '@modules/{{modules}}/repositories/{{Modules}}Repository'

type Request = {}

type Response = {}

// Here, the template becomes highly reusable since I can run the CLI
// and pass the name 'create', resulting in CreateUserService. If I pass 'update',
// it will become UpdateUserService, and so on.
@Injectable()
export class {{Name}}{{Module}}{{Type}} implements {{Type}} {
    constructor(
        private readonly {{modules}}Repository: {{Modules}}Repository
    ) {}

    async execute(req: Request): Promise<Response> {
        // #TODO
    }
}
```

This allows for a very granular and organized control over where files are generated, how they are structured, and what imports they include. It prevents various copy-paste errors while generating multiple files simultaneously.
