import { workers } from "../../index";

export function info(...args: unknown[]) {
	workers.logger.info(...args);
	process.exit(0);
}
