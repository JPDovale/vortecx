import { build } from 'gluegun'
import filegen from './commands/Filegen'
import { Command } from 'gluegun/build/types/domain/command'

async function run(argv) {
  const cli = build()
    .brand('vortecx')
    .src(__dirname)
    .plugins('./node_modules', {
      matching: 'filegen-*-plugin',
      hidden: true,
    })
    .help()
    .version()
    .create()

  cli.defaultCommand = filegen as Command
  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = {
  run,
}
