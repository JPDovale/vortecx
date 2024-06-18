import { ValueObject } from './base/valueObject'
import { Option } from './option'
import { Optional } from './types/optional'
import { Workers } from './workers'
import chalk from 'chalk'

interface HandlerProps<T = unknown> {
  args: T
  executionPath: string
  workers: Workers
}

interface CommandProps<T = unknown> {
  name: string
  description: string
  options: Option[]
  aliases: string[]
  handler: (props: HandlerProps<T>) => void
}

export class Command<T = unknown> extends ValueObject<CommandProps<T>> {
  static create<K = unknown>(
    props: Optional<CommandProps<K>, 'handler' | 'options' | 'aliases'>,
  ) {
    const commandProps: CommandProps<K> = {
      name: props.name.toLocaleLowerCase(),
      aliases: props.aliases ?? [],
      description: props.description,
      options: props.options ?? [],
      handler: props.handler ?? Command.defaultHandler(props.name),
    }

    const command = new Command<K>(commandProps)
    return command
  }

  addHandler(handler: (args: HandlerProps<T>) => void) {
    this.props.handler = handler
  }

  private static defaultHandler(commandName: string) {
    return () => {
      console.log(
        chalk.bgRedBright.white.bold('[PANIC]: No handler defined for command'),
      )
      console.log(
        chalk.bgRedBright.white.bold(`[PANIC]: Command name: ${commandName}`),
      )
    }
  }

  addOption(option: Option) {
    this.props.options.push(option)
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get handler() {
    return this.props.handler
  }

  get options() {
    return this.props.options
  }

  get aliases() {
    return this.props.aliases
  }
}
