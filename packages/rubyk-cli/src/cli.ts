import { build } from 'gluegun'
import  rubyk from './commands/Rubyk'
import { Command } from 'gluegun/build/types/domain/command'

async function run(argv) {
  const cli = build()
    .brand('rubyk')
    .src(__dirname)
    .plugins('./node_modules', {
      matching: 'rubyk-*-plugin',
      hidden: true,
    })
    .help()
    .version()
    .create()

    
  cli.defaultCommand = rubyk as Command
  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { 
  run, 
}
