import chalk from 'chalk'
import { Option, OptionType } from '../option'
import {workers} from '../workers'
import {
  Command as CommandCommander,
  Option as OptionCommander,
} from 'commander'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customHelpAction(...args: any[]) {
  const { options, commands } = args[1]
  const name = args[1]?.name() ?? ''

  console.log(chalk.green('[HELP]'), 'Welcome to help informations')
  console.log(
    chalk.green('[USAGE]'),
    chalk.green.bold(name),
    chalk.yellow('[Options]'),
    chalk.blue('<Command>'),
  )
  console.log('\n')

  console.log(
    chalk.bgHex('#060608').bold(
      `${Array.from({ length: 80 })
        .map(() => workers.figures.almostEqual)
        .join('')}`,
    ),
  )

  console.log(
    chalk.bgHex('#060608').yellow.bold(truncateLength('  Options', 80)),
  )

  if (options.length === 0) {
    console.log(
      chalk.bgHex('#060608').gray(truncateLength('No options defined', 80)),
    )
  }

  if (options.length > 0) {
    console.log(
      chalk.bgHex('#060608').bold(
        `${Array.from({ length: 80 })
          .map(() => workers.figures.line)
          .join('')}`,
      ),
    )

    console.log(
      chalk
        .bgHex('#060608')
        .bold(
          workers.figures.squareCenter,
          chalk.gray(truncateLength('Shot', 8)),
          workers.figures.lineVertical,
          chalk.gray(truncateLength('Long', 16)),
          workers.figures.lineVertical,
          chalk.gray(truncateLength('Description', 36)),
          workers.figures.lineVertical,
          chalk.gray(truncateLength('Required', 9)),
        ),
    )

    console.log(
      chalk.bgHex('#060608').bold(
        `${Array.from({ length: 80 })
          .map(() => workers.figures.line)
          .join('')}`,
      ),
    )

    options.forEach((option: OptionCommander) => {
      const notNullableShort = option?.short ?? ''
      const notNullableLong = option?.long ?? ''
      const notNullableDescription = option?.description ?? ''

      const shotTransformed = truncateLength(notNullableShort, 8)
      const longTransformed = truncateLength(notNullableLong, 16)
      const descriptionTransformed = truncateLength(notNullableDescription, 36)

      console.log(
        chalk
          .bgHex('#060608')
          .bold(
            workers.figures.bullet,
            shotTransformed,
            workers.figures.lineVertical,
            longTransformed,
            workers.figures.lineVertical,
            descriptionTransformed,
            workers.figures.lineVertical,
            option?.required && !option?.defaultValue
              ? truncateLength(chalk.greenBright(workers.figures.tick), 19)
              : truncateLength(chalk.redBright(workers.figures.cross), 19),
          ),
      )
    })
  }

  console.log(
    chalk.bgHex('#060608').bold(
      `${Array.from({ length: 80 })
        .map(() => workers.figures.almostEqual)
        .join('')}`,
    ),
  )
  console.log(
    chalk.bgHex('#060608').blue.bold(truncateLength('  Commands', 80)),
  )

  if (commands.length === 0) {
    console.log(
      chalk.bgHex('#060608').gray(truncateLength('No commands defined', 80)),
    )
  }

  if (commands.length > 0) {
    console.log(
      chalk
        .bgHex('#060608')
        .bold(
          workers.figures.squareCenter,
          chalk.gray(truncateLength('Name', 18)),
          workers.figures.lineVertical,
          chalk.gray(truncateLength('Aliases', 12)),
          workers.figures.lineVertical,
          chalk.gray(truncateLength('Description', 42)),
        ),
    )

    console.log(
      chalk.bgHex('#060608').bold(
        `${Array.from({ length: 80 })
          .map(() => workers.figures.line)
          .join('')}`,
      ),
    )

    commands.push({
      name: () => '[COMMAND] help',
      description: () => 'Show more information about a command',
    })

    commands.forEach((command: CommandCommander) => {
      const notNullableName = command?.name?.() ?? ''
      const notNullableDescription = command?.description?.() ?? ''
      const aliasesNotNullable = command?.aliases?.().join(', ') ?? ''

      const nameTransformed = truncateLength(notNullableName, 18)
      const aliasesTransformed = truncateLength(
        aliasesNotNullable,
        12,
        workers.figures.lineVertical,
      )
      const descriptionTransformed = truncateLength(
        notNullableDescription,
        42,
        workers.figures.lineVertical,
      )

      console.log(
        chalk
          .bgHex('#060608')
          .bold(
            workers.figures.bullet,
            nameTransformed,
            workers.figures.lineVertical,
            aliasesTransformed,
            workers.figures.lineVertical,
            descriptionTransformed,
          ),
      )
    })
  }
  console.log(
    chalk.bgHex('#060608').bold(
      `${Array.from({ length: 80 })
        .map(() => workers.figures.almostEqual)
        .join('')}`,
    ),
  )
  console.log('\n')
}

function truncateLength(str: string, len: number, prevBreak = ''): string {
  if (str.length > len) {
    const firstSlice = str.slice(0, len)
    const lastSlice = str.slice(len)

    const truncatedLastSlice = truncateLength(lastSlice, len, prevBreak)

    const finalStr = `${firstSlice}\n${' '.repeat(80 - len - (prevBreak.length + 1))}${prevBreak + ' '}${truncatedLastSlice}`

    if (finalStr.length < len) {
      const spaces = ' '.repeat(len - finalStr.length)
      return `${finalStr}${spaces}`
    }

    return finalStr
  }

  if (str.length < len) {
    const spaces = ' '.repeat(len - str.length)
    return `${str}${spaces}`
  }

  return str
}

const helpOption = Option.create({
  name: 'Help',
  description: 'Display help for command',
  short: 'h',
  handler: customHelpAction,
  type: OptionType.BOOLEAN,
  defaultValue: false,
})

export { helpOption, truncateLength }
