import { Command } from "@vortecx/cli-forger";
import type { Extensions } from "../extensions";

const moldCommand = Command.create<unknown, Extensions>({
  name: "Mold",
  description: "Mold of fgen.ts config file",
});

moldCommand.addHandler(async ({ workers }) => {
  const { files, folders, path, extensions } = workers;

  const projectFolder = path.getCurrentPath();
  const fgenFolder = path.getPath([projectFolder, ".vortecx", "fgen"]);
  const templateFolder = path.getPath([__dirname, "templates"]);

  const config = await extensions.loadConfig();
  const { modules } = config;
  const modulesNames = modules.map((m) => m.name);

  const CNEOpts = {
    exitOnExists: false,
    showInfosLog: true,
  };

  const templateFile = await files.read([templateFolder, "template.vort"]);
  const templateContent = templateFile.get();

  await folders.createIfNotExists(fgenFolder, CNEOpts);

  const existentsFolders = await folders.getDirectories(fgenFolder);
  const foldersToExclude: string[] = [];

  for (const module of modules) {
    const name = module.name;
    const types = module.types;
    const typesNames = module.types.map((t) => t.type);

    for (const type of types) {
      const folderTypePath = path.getPath([fgenFolder, name, type.type]);

      await folders.createIfNotExists(folderTypePath, CNEOpts);
      await files.create([folderTypePath, "index.vort"], templateContent, {
        exitOnExists: false,
      });
    }

    const directories = await folders.getDirectories([fgenFolder, name]);

    for (const dir of directories) {
      const dirName = dir.split("/")[dir.split("/").length - 1];

      if (!typesNames.includes(dirName)) {
        foldersToExclude.push(dir);
      }
    }
  }

  for (const folder of existentsFolders) {
    const folderName = folder.split("/")[folder.split("/").length - 1];

    if (!modulesNames.includes(folderName)) {
      foldersToExclude.push(folder);
    }
  }

  await Promise.all(foldersToExclude.map((f) => folders.del(f)));
});

export { moldCommand };