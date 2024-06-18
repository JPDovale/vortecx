import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { template, filesystem } = toolbox

  async function createFile(
    folder: string,
    fileName: string,
    content: string,
    contentProps?: { [x: string]: unknown },
  ) {
    await template.generate({
      directory: filesystem.path(
        filesystem.cwd(),
        'node_modules/@vortecx/filegen-cli/build/templates/src/templates',
      ),
      template: content,
      target: `${folder}/${fileName}`,
      props: contentProps || {},
    })
  }

  toolbox.createFile = createFile
}
