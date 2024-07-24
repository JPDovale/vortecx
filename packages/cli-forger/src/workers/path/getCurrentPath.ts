import { cwd } from "node:process";

export function getCurrentPath() {
	return cwd();
}
