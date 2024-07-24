import fs from "node:fs";
import path from "node:path";
import { isArray } from "lodash";

export async function exists(rawPath: string[] | string) {
	const rawPaths = isArray(rawPath) ? rawPath : [rawPath];
	const pathToCheck = path.resolve(...rawPaths);
	const fileExist = fs.existsSync(pathToCheck);
	return fileExist;
}
