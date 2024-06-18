import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'init',

  run: async (toolbox: GluegunToolbox) => {
    await toolbox.createFile('.', 'filegen.ts', 'initial.ts.ejs')
  },
}
