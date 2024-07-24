import { Command } from "@vortecx/cli-forger";
import type { Extensions } from "../extensions";

const listModulesCommand = Command.create<unknown, Extensions>({
	name: "List modules",
	aliases: ["lm"],
	description: "List declared modules",
});

listModulesCommand.addHandler(async ({ workers }) => {
	const { logger, figures, extensions } = workers;

	const fgenConfig = await extensions.loadConfig();

	for (const module of fgenConfig.modules) {
		logger.log(`${figures.line} ${module.name}`);
	}
});

export { listModulesCommand };
