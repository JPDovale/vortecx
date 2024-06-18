import { GluegunToolbox } from 'gluegun'
import { Config } from '../modules/config/entities/Config'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    createFile,
    print: { error },
  } = toolbox

  async function generateFile(config: Config, gen: string) {
    const generator = config.findGenerator(gen)

    if (!generator) {
      error(`Generator not found ${gen}`)
      process.exit(1)
    }

    await createFile(
      `${generator.path}`,
      `${generator.filename}.ts`,
      'genFile.ts.ejs',
      generator,
    )

    if (generator.test !== 'disabled') {
      if (generator.test === 'unit') {
        await createFile(
          `${generator.path}`,
          `${generator.filename}.spec.ts`,
          'genUnitTestFile.ts.ejs',
          generator,
        )
      }

      if (generator.test === 'integration') {
        await createFile(
          `${generator.path}`,
          `${generator.filename}.spec.ts`,
          'genUnitTestFile.ts.ejs',
          generator,
        )
      }

      if (generator.test === 'e2e') {
        await createFile(
          `${generator.path}`,
          `${generator.filename}.e2e.spec.ts`,
          'genE2ETestFile.ts.ejs',
          generator,
        )
      }
    }
  }

  toolbox.generateFile = generateFile
}
