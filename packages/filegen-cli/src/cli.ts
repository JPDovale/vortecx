import { CliForger } from "@vortecx/cli-forger";
import { version, description } from "../package.json";
import { initCommand } from "./commands/init";
import { listModulesCommand } from "./commands/listModules";
import { extensions, Extensions } from "./extensions";
import { moldCommand } from "./commands/mold";
import { generateCommand } from "./commands/generate";

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