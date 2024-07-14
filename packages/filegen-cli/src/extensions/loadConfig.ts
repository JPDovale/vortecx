import { Workers } from "@vortecx/cli-forger";
import { Extensions } from ".";
import { Config } from "../types";
import { isArray } from "lodash";

export type Type = {
  type: string;
  pluralType: string;
};

export type Module = {
  name: string;
  pluralName: string;
  types: Type[];
  ext: string;
};

export async function loadConfig(workers: Workers<Extensions>) {
  const { path, files, logger } = workers;

  const projectPath = path.getCurrentPath();
  const configFilePath = path.getPath([projectPath, "fgen.ts"]);

  const existsFile = files.exists(configFilePath);
  if (!existsFile) {
    logger.exit.error(
      "Configuration not initialized",
      "Try run `npx fgen init`",
    );
  }

  const cf = files.read(configFilePath).get().split("=")[1];
  const cfjs = `module.exports = ${cf}`;
  const cfjsPath = path.getPath([__dirname, "..", "fgen.js"]);

  const config = files.read(cfjsPath, {
    exitOnNotExists: false,
  });

  config.set(cfjs);
  config.save();

  const fgenConfig = await import(cfjsPath)
    .then((v) => v as Config)
    .catch((err) => {
      logger.exit.error("Falied to load configuration file");
      throw err;
    });

  const { modules = [] } = fgenConfig;

  const modulesMapped: Module[] = modules.map((module) => {
    const isArrayName = isArray(module.name);

    const name = isArrayName ? module.name[0] : (module.name as string);
    const pluralName = isArrayName ? module.name[1] : `${module.name}s`;
    const ext = module.ext ?? "ts";

    const types: Type[] = module.types.map((t) => {
      const isArrayType = isArray(t);
      const type = isArrayType ? t[0] : t;
      const pluralType = isArrayType ? t[1] : `${t}s`;

      return {
        type,
        pluralType,
      };
    });

    return {
      name,
      pluralName,
      types,
      ext,
    };
  });

  return { modules: modulesMapped } as { modules: Module[] };
}