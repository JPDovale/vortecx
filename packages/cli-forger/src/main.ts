import {
  Command as CommandCommander,
  Option as OptionCommander,
} from "commander";
import { Command } from "./command";
import { Option } from "./option";
import { helpOption } from "./options/helpOptions";
import { cwd } from "process";
import { workers } from "./workers";

interface CliForgerConfig {
  name: string;
  description: string;
  version: string;
}

export class CliForger {
  private prog: CommandCommander;

  constructor({ description, name, version }: CliForgerConfig) {
    this.prog = new CommandCommander();

    this.addOption(helpOption);

    this.prog
      .name(name)
      .description(description)
      .version(version, "-v, --version", "Output the current version")
      .helpCommand("[COMMAND] help")
      .helpOption(false);
  }

  public addDefaultCommand<T = unknown>(command: Command<T>) {
    const defaultCommand = this.makeCommand(command);
    this.prog.addCommand(defaultCommand, {
      isDefault: true,
    });
  }

  public run(argv: string[]) {
    return this.prog.parse(argv);
  }

  private makeCommand<T = unknown>(command: Command<T>) {
    const cmd = new CommandCommander();

    cmd
      .name(command.name)
      .description(command.description)
      .aliases(command.aliases)
      .action((...args) => {
        if (args[1].args[0] === "help") {
          return helpOption.handler?.(...args);
        }

        command.handler({
          args: args[0],
          executionPath: cwd(),
          workers,
          rawArgs: args,
        });
      });

    command.options.forEach((option) => {
      const newOption = new OptionCommander(
        option.getFlags(),
        option.description,
      );

      newOption.defaultValue = option?.defaultValue;
      newOption.required = option?.required ?? false;
      cmd.addOption(newOption);
    });

    return cmd;
  }

  public addCommand<T = unknown>(command: Command<T>) {
    const newCommand = this.makeCommand(command);
    this.prog.addCommand(newCommand);
  }

  public addOption(option: Option) {
    this.prog
      .option(option.getFlags(), option.description, option.defaultValue ?? "")
      .action((...args) => option.handler?.(...args));
  }
}