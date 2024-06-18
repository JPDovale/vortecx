import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { parameters } = toolbox

  async function readPluralModuleName() {
    const moduleName = parameters.options['p'] ?? parameters.options['plural']
    return moduleName
  } 

  toolbox.readPluralModuleName = readPluralModuleName
}