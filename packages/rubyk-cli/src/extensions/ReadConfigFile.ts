import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";
import { Config as ConfigType } from "src/types";

module.exports = (toolbox: GluegunToolbox) => {
  const {filesystem, print: { error }} = toolbox

  toolbox.readConfigFile = async (moduleName: string, fileName?: string) => {
    if(!moduleName) {
      error('Module name is missing! Please specify it with --m or --module')
      process.exit(1)
    }

    const configPath = filesystem.path(filesystem.cwd(), 'rubyk.ts')
    const configExists = filesystem.exists(configPath)

    if(!configExists) {
      error('Config file not found')
      process.exit(1)
    }

    const cf = (await filesystem.readAsync(configPath)).split('=')[1]
    const cfjs = `module.exports = ${cf}`

    const filePath = filesystem.path(filesystem.cwd(), 'node_modules', '@rubykgen', 'rubyk-cli', '.rubyk', 'rubyk.js')
    await filesystem.writeAsync(filePath, cfjs)
    
    const ConfigFile = await import(filePath)
    
    const configFile = ConfigFile.default as ConfigType 
        
    const seenType = new Set()
    const duplicatedGenerators = []

    for(const generator of configFile.generators) {
      if(seenType.has(generator.type)) {
        duplicatedGenerators.push(generator)
        continue
      }

      seenType.add(generator.type)
    }

    if(duplicatedGenerators.length > 0) {
      error('Duplicated generator types found: ' + duplicatedGenerators.map(gen => gen.type))
      process.exit(1)
    }

    const config = Config.create(configFile, { module: moduleName, file: fileName, type: 'unknown' })

    return config
  }
}