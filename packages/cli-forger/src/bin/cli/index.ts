import { CliForger } from "../../main";
import pack from "../../../package.json";
import { Command } from "src/command";
import { Option } from "src/option";

const cli = new CliForger({
  name: "CliForger",
  version: pack.version,
  description: "A framework to create cli's",
});

const initCommand = Command.create<{
  folder?: string | null;
}>({
  name: "init",
  description: "Init a project wiht cli forger",
  options: [
    Option.create({
      name: "Folder",
      short: "f",
      long: "folder",
      required: false,
      description: "Define a folder to create project",
    }),
  ],
});

const sayHelloCommand = Command.create<{ for: string }>({
  name: "Say hello",
  description: "Say hello for world or anyone",
  aliases: ["sh"],
  options: [
    Option.create({
      name: "For anyone",
      description: "Define woo receive hello",
      required: false,
      long: "for",
      short: "f",
    }),
  ],
});

sayHelloCommand.addHandler(({ args, workers }) => {
  const { for: forAnyone } = args;

  if (forAnyone) {
    workers.logger.info(`Hello ${forAnyone}!`);
    return;
  }

  workers.logger.info("Hello world!");
});

initCommand.addHandler(async ({ workers, args }) => {
  const { folder } = args;
  const res = await workers.prompt.ask([
    {
      name: "name",
      required: true,
      type: "input",
      message: "Project name",
    },
  ]);

  const name = res.name
    .replace(/[<>:"\/\\|?*\x00-\x1F]/g, "") // Remove caracteres inválidos no Windows
    .replace(/[\x7F]/g, "") // Remove o caractere DEL
    .replace(/^\.+$/, "") // Remove nomes reservados no Windows (., ..)
    .replace(/[.\s]+$/g, "") // Remove espaços e pontos do final da string
    .replace(/\s+/g, "_");

  const initProjectPath = workers.path.getPath([
    folder ?? workers.path.getCurrentPath(),
    name,
  ]);

  const existsFile = workers.files.exists([initProjectPath, "package.json"]);
  if (existsFile) {
    workers.logger.exit.error("Project already exist in this folder");
  }

  workers.folders.createIfNotExists(initProjectPath, {
    exitOnExists: false,
  });

  const templatesPath = workers.path.getPath([__dirname, "cli", "templates"]);

  workers.templates.save(
    [templatesPath, "package.json.vort"],
    [initProjectPath, "package.json"],
    { name },
  );

  workers.templates.save(
    [templatesPath, "eslintrc.vort"],
    [initProjectPath, ".eslintrc"],
  );

  workers.templates.save(
    [templatesPath, "tsconfig.json.vort"],
    [initProjectPath, "tsconfig.json"],
  );

  workers.templates.save(
    [templatesPath, "gitignore.vort"],
    [initProjectPath, ".gitignore"],
  );

  workers.templates.save(
    [templatesPath, "npmrc.vort"],
    [initProjectPath, ".npmrc"],
  );

  workers.folders.createIfNotExists([initProjectPath, "src"], {
    exitOnExists: false,
  });

  workers.templates.save(
    [templatesPath, "index.ts.vort"],
    [initProjectPath, "src", "index.ts"],
  );

  workers.templates.save(
    [templatesPath, "cli.ts.vort"],
    [initProjectPath, "src", "cli.ts"],
    { name },
  );

  const loading = await workers.prompt.loading("Instaling libs");

  workers.prompt.executeInFolder(
    initProjectPath,
    "npm i @vortecx/cli-forger && npm i --save-dev @vortecx/eslint-config @types/node tsx typescript",
  );

  workers.prompt.executeInFolder(
    initProjectPath,
    'git init -b "main" && git add . && git commit -m "first commit"',
  );

  loading.stop();
});

cli.addDefaultCommand(initCommand);
cli.addCommand(sayHelloCommand);

export default cli;