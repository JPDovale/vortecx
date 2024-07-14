import { ValueObject } from "./base/valueObject";
import { Option } from "./option";
import { Optional } from "./types/optional";
import { Workers } from "./workers";
import chalk from "chalk";

interface HandlerProps<T = unknown, W extends {} = {}> {
  args: T;
  rawArgs: any[];
  executionPath: string;
  workers: Workers<W>;
}

interface CommandProps<T = unknown, W = {}> {
  name: string;
  description: string;
  options: Option[];
  aliases: string[];
  handler: (props: HandlerProps<T, W>) => void;
}

export class Command<T = unknown, W = {}> extends ValueObject<
  CommandProps<T, W>
> {
  static create<K = unknown, Y = {}>(
    props: Optional<CommandProps<K, Y>, "handler" | "options" | "aliases">,
  ) {
    const commandProps: CommandProps<K, Y> = {
      name: props.name.toLocaleLowerCase().replace(/\s+/g, "-"),
      aliases: props.aliases ?? [],
      description: props.description,
      options: props.options ?? [],
      handler: props.handler ?? Command.defaultHandler(props.name),
    };

    const command = new Command<K, Y>(commandProps);
    return command;
  }

  addHandler(handler: (args: HandlerProps<T, W>) => void) {
    this.props.handler = handler;
  }

  private static defaultHandler(commandName: string) {
    return () => {
      console.log(
        chalk.bgRedBright.white.bold("[PANIC]: No handler defined for command"),
      );
      console.log(
        chalk.bgRedBright.white.bold(`[PANIC]: Command name: ${commandName}`),
      );
    };
  }

  addOption(option: Option) {
    this.props.options.push(option);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get handler() {
    return this.props.handler;
  }

  get options() {
    return this.props.options;
  }

  get aliases() {
    return this.props.aliases;
  }
}