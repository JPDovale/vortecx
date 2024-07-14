import { Command } from "@vortecx/cli-forger";
import { Extensions } from "../extensions";

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
    showInfosLog: false,
  };

  const templateFile = files.read([templateFolder, "template.vort"]);
  const templateContent = templateFile.get();

  folders.createIfNotExists(fgenFolder, CNEOpts);

  const exitentsFolders = folders.getDirectories(fgenFolder);
  const foldersToExclude: string[] = [];

  modules.forEach((module) => {
    const name = module.name;
    const types = module.types;
    const typesNames = module.types.map((t) => t.type);

    types.forEach((type) => {
      const folderTypePath = path.getPath([fgenFolder, name, type.type]);
      folders.createIfNotExists(folderTypePath, CNEOpts);
      files.create([folderTypePath, "index.vort"], templateContent, {
        exitOnExists: false,
      });
    });

    const directories = folders.getDirectories([fgenFolder, name]);

    directories.forEach((dir) => {
      if (!typesNames.includes(dir)) {
        foldersToExclude.push(path.getPath([fgenFolder, name, dir]));
      }
    });
  });

  exitentsFolders.forEach((folder) => {
    if (!modulesNames.includes(folder)) {
      foldersToExclude.push(path.getPath([fgenFolder, folder]));
    }
  });

  foldersToExclude.forEach((folder) => folders.del(folder));
});

export { moldCommand };