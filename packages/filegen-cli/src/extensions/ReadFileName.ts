import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { parameters } = toolbox

  async function readFileName() {
    const fileName = parameters.options['f'] ?? parameters.options['file']
    return fileName 
  } 

  toolbox.readFileName = readFileName
}