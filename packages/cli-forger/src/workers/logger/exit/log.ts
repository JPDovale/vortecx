import { workers } from "../../index";

export function log(...args: unknown[]) {
	workers.logger.log(...args);
	process.exit(0);
}
