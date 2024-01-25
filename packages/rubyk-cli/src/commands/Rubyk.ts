import { GluegunToolbox } from "gluegun";
import { Config, Module } from "../modules/config/entities/Config";
import { Config as ConfigType } from "src/types";


const rubyk = {
  name: 'default',
  alias: ['d'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      readConfigFile,
      makeConfig,
      generateFile,
      prompt: {
        ask,
      },
      print: { error, spin, }
    } = toolbox 

    const configPath = await readConfigFile()
    const ConfigFile = await import(configPath) as ConfigType
    
    const modules: Module[] = ConfigFile.modules.map((module) => {
      if(module instanceof Array) {
        return {
          name: module[0],
          plural: module[1]
        }
      }

      return {
        name: module,
        plural: `${module}s`
      }
    })

    const config = await makeConfig('user', 'users', undefined, configPath) as Config

    const res = await ask([
      {
        message: 'Choice some modules to generate',
        name: 'modules',
        type: 'multiselect',
        align: 'left',
        choices: modules.map(m => m.name),
      },
      {
        message: 'Choice generators to create files',
        name: 'generators',
        type: 'multiselect',
        choices: config.generators.map(m => ({
          name: m.type,
          value: m.alias ?? m.type,
        })),
      },
      {
        message: 'Set you file name',
        name: 'file',
        type: 'input'
      }
    ])
    
    if(!res.modules || res.modules.length === 0) {
      error('Modules are required')
      process.exit(1)
    }

    
    if(!res.generators || res.generators.length === 0) {
      error('Generators are required')
      process.exit(1)
    }
    
    if(!res.file) {
      error('File name is required')
      process.exit(1)
    }

    const sp = spin('Generating...')

    for (const m of res.modules) {
      const module = modules.find(mod => mod.name === m)

      for (const gen of res.generators) {
        const generator = config.findGenerator(gen)

        if(!generator) {
          error(`Generator not found ${gen}`)
        }

        const conf = await makeConfig(m, module.plural,  res.file, configPath)

        await generateFile(conf, gen)
      }
    }

    sp.succeed('Done! You ready ^^')
    process.exit(0)
  }
}

export default rubyk