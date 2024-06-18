import { isString } from 'lodash'

export function log(...args: unknown[]) {
  let msg = ''

  const logKeys = ['[ERROR]', '[INFO]']

  args.forEach((arg, i) => {
    let argInKeys = false

    logKeys.forEach((key) => {
      if (!argInKeys) argInKeys = String(arg).includes(key)
    })

    if (isString(arg)) {
      msg += arg
    }

    if (i !== args.length - 1 && !argInKeys) {
      msg += '\n'
    }
  })

  console.log(msg)
}
