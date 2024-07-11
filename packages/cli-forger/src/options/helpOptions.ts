import chalk from "chalk";
import { Option, OptionType } from "../option";
import { workers } from "../workers";
import {
  Command as CommandCommander,
  Option as OptionCommander,
} from "commander";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customHelpAction(...args: any[]) {
  const { options, commands } = args[1];
  const name = args[1]?.name() ?? "";

  console.log(chalk.green("  [HELP]"), "Welcome to help informations");
  console.log(
    chalk.green("  [USAGE]"),
    chalk.green.bold(name),
    chalk.yellow("[Options]"),
    chalk.blue("<Command>"),
  );
  console.log(chalk.gray("  ".padEnd(120, workers.figures.infinity)));
  console.log(chalk.yellow.bold("  Options"));

  if (options.length === 0) {
    console.log(workers.figures.play, chalk.gray(" No options defined"));
  }

  if (options.length > 0) {
    console.log(
      chalk.gray.bold(
        "  Req".padEnd(6, " "),
        // workers.figures.play,
        "Short".padEnd(6, " "),
        // workers.figures.play,
        "Long".padEnd(18, " "),
        // workers.figures.play,
        "Description",
      ),
    );

    options.forEach((option: OptionCommander) => {
      const notNullableShort = (option?.short ?? "").padEnd(4, " ");
      const notNullableLong = (option?.long ?? "").padEnd(16, " ");
      const notNullableDescription = option?.description ?? "";

      console.log(
        chalk.bold(
          workers.figures.bullet,
          option?.required && !option?.defaultValue
            ? chalk.greenBright(workers.figures.tick.padEnd(4, " "))
            : chalk.redBright(workers.figures.cross.padEnd(4, " ")),
          chalk.gray(workers.figures.pointer),
          notNullableShort,
          chalk.gray(workers.figures.pointer),
          notNullableLong,
          chalk.gray(workers.figures.pointer),
          notNullableDescription,
        ),
      );
    });
  }

  console.log(chalk.gray("  ".padEnd(120, workers.figures.infinity)));
  console.log(chalk.blue.bold("  Commands"));

  if (commands.length === 0) {
    console.log(workers.figures.play, chalk.gray("No commands defined"));
  }

  if (commands.length > 0) {
    console.log(
      chalk.gray.bold(
        "  Name".padEnd(18, " "),
        // workers.figures.play,
        "Aliases".padEnd(12, " "),
        // workers.figures.play,
        "Description",
      ),
    );

    commands.push({
      name: () => "<COMMAND> help",
      description: () => "Show more information about a command",
    });

    commands.forEach((command: CommandCommander) => {
      const notNullableName = (command?.name?.() ?? "").padEnd(16, " ");
      const notNullableDescription = command?.description?.() ?? "";
      const aliases = command?.aliases?.().join(", ");
      const notNullableAliases = (
        !aliases || aliases.length === 0 ? chalk.gray("No aliases") : aliases
      ).padEnd(10, " ");

      console.log(
        chalk.bold(
          workers.figures.bullet,
          notNullableName,
          chalk.gray(workers.figures.pointer),
          notNullableAliases,
          chalk.gray(workers.figures.pointer),
          notNullableDescription,
        ),
      );
    });
  }

  console.log(chalk.gray("  ".padEnd(120, workers.figures.infinity)));
}

const helpOption = Option.create({
  name: "Help",
  description: "Display help for command",
  short: "h",
  handler: customHelpAction,
  type: OptionType.BOOLEAN,
  defaultValue: false,
});

export { helpOption };