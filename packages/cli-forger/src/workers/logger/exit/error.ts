import { workers } from "../../index";

export function error(...args: unknown[]) {
	workers.logger.error(...args);
	process.exit(0);
}
