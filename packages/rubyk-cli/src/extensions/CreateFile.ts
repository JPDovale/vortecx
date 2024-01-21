import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { template, filesystem, print: { success } } = toolbox

  async function createFile(folder: string, fileName: string, content: string, contentProps?: {[x: string]: any}) {
    await template.generate({
      directory: filesystem.path(
        filesystem.cwd(), 
        'node_modules/@rubykgen/rubyk-cli/build/templates/src/templates', 
      ),
      template: content,
      target: `${folder}/${fileName}`,
      props: contentProps || {}
    })

    success(`File ${fileName} created`)
  }

  toolbox.createFile = createFile
}