import { Command } from "@vortecx/cli-forger";
import { Extensions } from "../extensions";

const listModulesCommand = Command.create<unknown, Extensions>({
  name: "List modules",
  aliases: ["lm"],
  description: "List declareted modules",
});

listModulesCommand.addHandler(async ({ workers }) => {
  const { logger, figures, extensions } = workers;

  const fgenConfig = await extensions.loadConfig();

  fgenConfig.modules.forEach((module) => {
    logger.log(`${figures.line} ${module.name}`);
  });
});

export { listModulesCommand };