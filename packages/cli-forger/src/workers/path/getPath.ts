import path from "node:path";
import { isArray } from "lodash";

export function getPath(rawPath: string[] | string) {
	const rawPaths = isArray(rawPath) ? rawPath : [rawPath];
	const pathToCheck = path.resolve(...rawPaths);
	return pathToCheck;
}
