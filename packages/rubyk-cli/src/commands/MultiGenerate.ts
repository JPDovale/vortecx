import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";

module.exports = {
  name: 'multi-generate',
  alias: ['mgen', 'mg'],
  run: async (toolbox: GluegunToolbox) => {
    const { 
      makeConfig, 
      readModuleName,
      readFileName,
      readPluralModuleName,
      generateFile,
      parameters ,
      print: { error, success }
    } = toolbox

    const moduleName = await readModuleName()
    const pluralModuleName = await readPluralModuleName()
    const fileName = await readFileName()

    const config = await makeConfig(moduleName, pluralModuleName, fileName) as Config

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