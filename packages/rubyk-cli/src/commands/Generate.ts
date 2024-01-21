import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";

module.exports = {
  name: 'generate',
  alias: ['gen', 'g'],
  run: async (toolbox: GluegunToolbox) => {
    const { 
      readConfigFile, 
      readModuleName,
      readFileName,
      generateFile,
      parameters ,
      print: { error, success, info }
    } = toolbox

    if(!parameters.first) {
      error('Generator name is missing')
      process.exit(1)
    }

    info('Reading module...')
    const moduleName = await readModuleName()
    info('Getting filename...')
    const fileName = await readFileName()
    info('Reading your configurations file...')
    const config = await readConfigFile(moduleName, fileName) as Config
   
    await generateFile(config, parameters.first)

    success("Done! You ready ^^")
  }
}