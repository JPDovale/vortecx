import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";

module.exports = {
  name: 'multi-generate',
  alias: ['mgen', 'mg'],
  run: async (toolbox: GluegunToolbox) => {
    const { 
      readConfigFile, 
      readModuleName,
      readFileName,
      generateFile,
      parameters ,
      print: { error, success, info }
    } = toolbox

    info('Reading module...')
    const moduleName = await readModuleName()

    info('Getting filename...')
    const fileName = await readFileName()

    info('Reading your configurations file...')
    const config = await readConfigFile(moduleName, fileName) as Config

    info('Finding generators...')
    const _generatorsName = parameters.options['g'] ?? parameters.options['generators']
    if(!_generatorsName) {
      error('Generators name is missing! Please specify it with --g or --generators')
      process.exit(1)
    }

    const generatorsName = _generatorsName.split(',')

    for (const gen of generatorsName) {
      await generateFile(config, gen)
    }

    success("Done! You ready ^^")
  }
}