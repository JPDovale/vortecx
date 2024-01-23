import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";
import { Config as ConfigType } from "src/types";
import { infraGenerators } from "../plugins/InfraGenerators";
import { nestGenerators } from "../plugins/NestGenerators";
import { prismaGenerators } from "../plugins/PrismaGenerators";

module.exports = (toolbox: GluegunToolbox) => {
  const { filesystem, print: { error }  } = toolbox

  async function makeConfig(moduleName: string, pluralModule: string, fileName?: string, filePath?: string) {
    if(!moduleName) {
      error('Module name is missing! Please specify it with --m or --module')
      process.exit(1)
    }
   
    const fp = filePath ? filePath :  await readConfigFile()

    const ConfigFile = await import(fp)
    const configFile = ConfigFile.default as ConfigType 

    const defaultPlugins = {
      infraGenerators,
      nestGenerators,
      prismaGenerators
    }

    if(configFile.plugins && configFile.plugins.length > 0) {
      for(const plugin of configFile.plugins) {
        if(!configFile.generators) {
          configFile.generators = []
        }

        if(!/^rubyk-\*\-plugin$/.test(plugin) && defaultPlugins[plugin]) {
          configFile.generators.push(...defaultPlugins[plugin]())
        }
      }
    }

    if(configFile.generators.length === 0) {
      error('No generators found')
      process.exit(1)
    }

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

    const config = Config.create(
      configFile, 
      { 
        module: moduleName, 
        file: fileName, 
        type: 'unknown',
        pluralModule 
      }
    )

    return config
  }

  async function readConfigFile() {
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
    
    return filePath
  }

  toolbox.readConfigFile = readConfigFile
  toolbox.makeConfig = makeConfig
}