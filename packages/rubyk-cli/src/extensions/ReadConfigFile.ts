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

    
    const configFile = await import(configPath) as { config: ConfigType }
    
    const seenType = new Set()
    const duplicatedGenerators = []

    for(const generator of configFile.config.generators) {
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

    const config = Config.create(configFile.config, { module: moduleName, file: fileName, type: 'unknown' })

    return config
  }
}