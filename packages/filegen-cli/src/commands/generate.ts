import { Command } from "@vortecx/cli-forger";
import type { Extensions } from "src/extensions";

const generateCommand = Command.create<unknown, Extensions>({
  name: "Generate",
  aliases: ["gen"],
  description: "Generate files for selected modules",
});

generateCommand.addHandler(async ({ workers }) => {
  const { prompt, folders, files, path, logger, templates, extensions } =
    workers;

  const projectFolder = path.getCurrentPath();
  const fgenFolder = path.getPath([projectFolder, ".vortecx", "fgen"]);
  const existsFgenFolder = await folders.exists(fgenFolder);

  if (!existsFgenFolder) {
    logger.exit.error(
      "Folder of templates not found, pleas rum `npx fgen mold` first",
    );
  }

  const existentsFolders = await folders.getDirectories(fgenFolder);
  const config = await extensions.loadConfig();

  const { modules } = await prompt
    .ask<{ modules: string[] }>([
      {
        name: "modules",
        type: "multiselect",
        choices: existentsFolders,
        message: "Select modules",
      },
    ])
    .catch(() => {
      logger.info("Canceled");
      process.exit(0);
    });

  if (modules.length === 0) {
    logger.exit.error(" Select a module to generate files");
  }

  const modulesObject: {
    [x: string]: {
      name: string;
      types: string[];
    };
  } = {};

  for (const module of modules) {
    const subFolders = await folders.getDirectories([fgenFolder, module]);

    const { types, name } = await prompt
      .ask<{ types: string[]; name: string }>([
        {
          name: "name",
          type: "input",
          message: `Type the name to creation of module ${module}.`,
        },
        {
          name: "types",
          type: "multiselect",
          message: `Choice types for ${module}`,
          choices: subFolders,
        },
      ])
      .catch(() => {
        logger.info("Canceled");
        process.exit(0);
      });

    if (types.length === 0) {
      logger.exit.error(" Select a type for module");
    }

    modulesObject[module] = {
      types,
      name,
    };
  }

  const generators: {
    module: string;
    Module: string;
    MODULE: string;
    modules: string;
    Modules: string;
    MODULES: string;

    type: string;
    Type: string;
    TYPE: string;
    types: string;
    Types: string;
    TYPES: string;

    name: string;
    Name: string;
    NAME: string;
    ext: string;
  }[] = [];

  const mods = Object.entries(modulesObject);

  for (const [k, v] of mods) {
    const module = config.modules.find((conf) => k.includes(conf.name));

    if (!module) {
      logger.exit.error(" Module not found in your configuration file");
    }

    const { types, name } = v;

    for (const t of types) {
      const type = module.types.find((ty) => t.includes(ty.type));

      if (!type) {
        logger.exit.error(" Type not found in your configuration file");
      }

      const props = {
        module: extensions.sanitizeString(module.name),
        Module: extensions.capitalizeFirstLetter(module.name),
        MODULE: extensions.sanitizeString(module.name).toUpperCase(),
        modules: extensions.sanitizeString(module.pluralName),
        Modules: extensions.capitalizeFirstLetter(module.pluralName),
        MODULES: extensions.sanitizeString(module.pluralName).toUpperCase(),

        type: extensions.sanitizeString(type.type),
        Type: extensions.capitalizeFirstLetter(type.type),
        TYPE: extensions.sanitizeString(type.type).toUpperCase(),
        types: extensions.sanitizeString(type.pluralType),
        Types: extensions.capitalizeFirstLetter(type.pluralType),
        TYPES: extensions.sanitizeString(type.pluralType).toUpperCase(),

        name: extensions.sanitizeString(name),
        Name: extensions.capitalizeFirstLetter(name),
        NAME: extensions.sanitizeString(name).toUpperCase(),

        ext: extensions.sanitizeString(module.ext),
      };

      generators.push(props);
    }
  }

  for (const gen of generators) {
    const filePopulated = await templates.populate(
      [fgenFolder, gen.module, gen.type, "index.vort"],
      gen,
    );

    const [header, content] = filePopulated.split("---");
    const metadata = header.split("\n");

    const folder = metadata
      .find((meta: string) => meta.startsWith("folder->"))
      ?.split("->")[1];
    const filename = metadata
      .find((meta: string) => meta.startsWith("filename->"))
      ?.split("->")[1];

    if (!folder || !filename) {
      logger.exit.error(
        " No metadata found! Verify folder or filename in our template file",
      );
    }

    await folders.createIfNotExists([projectFolder, folder], {
      exitOnExists: false,
      showInfosLog: false,
    });

    await files.create([projectFolder, folder, filename], content, {
      exitOnExists: false,
      updateOnExists: false,
      showInfosLog: true,
    });
  }
});

export { generateCommand };