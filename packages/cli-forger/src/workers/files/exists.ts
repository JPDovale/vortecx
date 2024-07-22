import fs from "fs";
import { isArray } from "lodash";
import path from "path";

export async function exists(rawPath: string[] | string) {
  const rawPaths = isArray(rawPath) ? rawPath : [rawPath];
  const pathToCheck = path.resolve(...rawPaths);
  const fileExist = fs.existsSync(pathToCheck);
  return fileExist;
}
