import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { parameters } = toolbox

  async function readPluralModuleName() {
    const moduleName = parameters.options['pm'] ?? parameters.options['plural-module']
    return moduleName
  } 

  toolbox.readPluralModuleName = readPluralModuleName
}