import { Command } from "@vortecx/cli-forger";
import { Extensions } from "../extensions";

const initCommand = Command.create<unknown, Extensions>({
  name: "Init",
  description: "Init a configuration",
});

initCommand.addHandler(async ({ workers }) => {
  const { path, files, logger, templates } = workers;

  const initProjectPath = path.getCurrentPath();

  const existsFile = files.exists([initProjectPath, "fgen.ts"]);
  if (existsFile) {
    logger.exit.error("Configuration already initialized");
  }

  const templatesPath = path.getPath([__dirname, "templates"]);
  const isDev = process.env.NODE_ENV === "development";

  templates.save(
    [templatesPath, "fgen.ts.vort"],
    [initProjectPath, "fgen.ts"],
    {
      from: isDev ? "./src/types.ts" : "@vortecx/filegen-cli",
    },
  );
});

export { initCommand };