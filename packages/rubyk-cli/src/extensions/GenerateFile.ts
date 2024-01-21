import { GluegunToolbox } from "gluegun";
import { Config } from "../modules/config/entities/Config";

module.exports = (toolbox: GluegunToolbox) => {
  const { createFile, print: { info, error } } = toolbox

  async function generateFile(config: Config, gen: string) {
    info('Finding generator...')
    const generator = config.findGenerator(gen)

    if(!generator) {
      error(`Generator not found ${gen}`)
      process.exit(1)
    }

    info('Creating file...')
    await createFile(`${generator.path}`, `${generator.filename}.ts`, 'genFile.ts.ejs', generator)
    
    if(generator.test !== 'disabled') {
      if(generator.test === 'unit') {
        info('Creating unit test file...')
        await createFile(`${generator.path}`, `${generator.filename}.spec.ts`, 'genUnitTestFile.ts.ejs', generator)
      }

      if(generator.test === 'integration') {
        info('Creating integration test file...')
        await createFile(`${generator.path}`, `${generator.filename}.spec.ts`, 'genUnitTestFile.ts.ejs', generator)
      }

      if(generator.test === 'e2e') {
        info('Creating e2e test file...')
        await createFile(`${generator.path}`, `${generator.filename}.e2e.spec.ts`, 'genE2ETestFile.ts.ejs', generator)
      }
    }

  }

  toolbox.generateFile = generateFile
}