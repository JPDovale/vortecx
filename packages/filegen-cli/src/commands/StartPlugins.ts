import { GluegunToolbox } from 'gluegun'
import { Config } from '../modules/config/entities/Config'

module.exports = {
  name: 'startPlugins',
  alias: ['srtp', 'sp'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      makeConfig,
      createFile,
      print: { error, spin },
    } = toolbox

    const config = (await makeConfig('any', 'anys')) as Config

    const starters = config.options?.starters ?? []

    if (starters.length <= 0) {
      error('No one starter provide by anyone plugin.')
      process.exit(1)
    }

    const sp = spin('Coping starter files...')

    for (const starter of starters) {
      const folder = starter.path.split('/').slice(0, -1).join('/')
      const fileName = starter.path.split('/').slice(-1)[0]

      await createFile(folder, fileName, starter.template)
    }

    sp.succeed('Starter files copied!')
    process.exit(0)
  },
}
