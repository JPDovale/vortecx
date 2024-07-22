import chalk from "chalk";
import { Option, OptionType } from "../option";
import { workers } from "../workers";
import {
  Command as CommandCommander,
  Option as OptionCommander,
} from "commander";
import { Item } from "src/workers/ui/line";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customHelpAction(...args: any[]) {
  const { options, commands } = args[1];
  const name = args[1]?.name() ?? "";

  const optionsItems: Item[][] = [];
  const commandItems: Item[][] = [];

  if (options.length > 0) {
    options.forEach((option: OptionCommander) => {
      const notNullableShort = (option?.short ?? "").padEnd(4, " ");
      const notNullableLong = (option?.long ?? "").padEnd(16, " ");
      const notNullableDescription = option?.description ?? "";
      const isRequired = option?.required && !option.defaultValue;
      const isRequiredSimbol = isRequired
        ? workers.figures.tick
        : workers.figures.cross;
      const isRequiredColor = isRequired ? chalk.greenBright : chalk.redBright;

      optionsItems.push([
        workers.figures.bullet,
        [isRequiredSimbol.padEnd(4, " "), isRequiredColor],
        [workers.figures.pointer, chalk.gray],
        notNullableShort,
        [workers.figures.pointer, chalk.gray],
        notNullableLong,
        [workers.figures.pointer, chalk.gray],
        notNullableDescription,
      ]);
    });
  }

  if (commands.length > 0) {
    commands.push({
      name: () => "<COMMAND> help",
      description: () => "Show more information about a command",
    });

    commands.forEach((command: CommandCommander) => {
      const notNullableName = (command?.name?.() ?? "").padEnd(16, " ");
      const notNullableDescription = command?.description?.() ?? "";
      const aliases = command?.aliases?.().join(", ");
      const notNullableAliases = (
        !aliases || aliases.length === 0 ? "No aliases" : aliases
      ).padEnd(12, " ");

      commandItems.push([
        workers.figures.bullet,
        notNullableName,
        [workers.figures.pointer, chalk.gray],
        notNullableAliases,
        [workers.figures.pointer, chalk.gray],
        notNullableDescription,
      ]);
    });
  }

  console.log(
    workers.ui.box({
      title: "HELP",
      width: workers.ui.getColumns() < 120 ? workers.ui.getColumns() : 120,
      lines: [
        [["  [HELP]", chalk.green], "Welcome to help informations"],
        [
          ["  [USAGE]", chalk.green],
          [name, chalk.green.bold],
          ["[Options]", chalk.yellow],
          ["<Command>", chalk.blue],
        ],
        [],
      ],
      sections: [
        {
          title: ["Options", chalk.yellow.bold],
          lines: [
            [
              [
                "  Req"
                  .padEnd(7, " ")
                  .concat("Short".padEnd(7, " "))
                  .concat("Long".padEnd(19, " "))
                  .concat("Description"),
                chalk.gray.bold,
              ],
            ],
            ...optionsItems,
          ],
          isEmptyWith: 1,
          emptyLines: [
            workers.figures.play,
            [" No options defined", chalk.gray],
          ],
        },
        {
          title: ["Commands", chalk.blue.bold],
          lines: [
            [
              [
                "  Name"
                  .padEnd(19, " ")
                  .concat("Aliases".padEnd(15, " "))
                  .concat("Description"),
                chalk.gray.bold,
              ],
            ],
            ...commandItems,
          ],
          isEmptyWith: 1,
          emptyLines: [
            workers.figures.play,
            [" No commands defined", chalk.gray],
          ],
        },
      ],
    }),
  );
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