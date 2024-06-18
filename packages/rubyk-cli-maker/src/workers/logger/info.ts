import chalk from 'chalk'
import { workers } from '../index'

export function info(...args: unknown[]) {
  workers.logger.log(
    chalk.bgBlueBright.white.bold('[INFO]'),
    ...args.map((arg) => chalk.blue(arg)),
  )
}
