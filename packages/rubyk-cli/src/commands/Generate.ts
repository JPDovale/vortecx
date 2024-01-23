import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";

module.exports = {
  name: 'generate',
  alias: ['gen', 'g'],
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

    if(!parameters.first) {
      error('Generator name is missing')
      process.exit(1)
    }

    const moduleName = await readModuleName()
    const pluralModuleName = await readPluralModuleName()
    const fileName = await readFileName()
    const config = await makeConfig(moduleName, pluralModuleName, fileName) as Config
   
    await generateFile(config, parameters.first)

    success("Done! You ready ^^")
  }
}