import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { template, print: { success } } = toolbox

  async function createFile(folder: string, fileName: string, content: string, contentProps?: {[x: string]: any}) {
    await template.generate({
      template: content,
      target: `${folder}/${fileName}`,
      props: contentProps || {}
    })

    success(`File ${fileName} created`)
  }

  toolbox.createFile = createFile
}