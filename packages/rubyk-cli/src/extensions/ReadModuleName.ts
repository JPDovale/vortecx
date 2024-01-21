import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { parameters, print: { error } } = toolbox

  async function readModuleName() {
    const moduleName = parameters.options['m'] ?? parameters.options['module']

    if(!moduleName) {
      error('Module name is missing! Please specify it with --m or --module')
      process.exit(1)
    }

    return moduleName
  } 

  toolbox.readModuleName = readModuleName
}