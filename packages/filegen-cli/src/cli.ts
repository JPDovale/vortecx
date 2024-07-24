import { CliForger } from "@vortecx/cli-forger";
import { description, version } from "../package.json";
import { generateCommand } from "./commands/generate";
import { initCommand } from "./commands/init";
import { listModulesCommand } from "./commands/listModules";
import { moldCommand } from "./commands/mold";
import { type Extensions, extensions } from "./extensions";

const cli = new CliForger<Extensions>({
	name: "File generator CLI",
	version: version,
	description,
});

cli.addExtensions(extensions);

cli.addCommand(initCommand);
cli.addCommand(moldCommand);
cli.addCommand(generateCommand);
cli.addCommand(listModulesCommand);

export default cli;
