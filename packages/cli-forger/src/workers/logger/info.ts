import chalk from "chalk";
import { workers } from "../index";

export function info(...args: unknown[]) {
	workers.logger.log(
		chalk.bgBlue.black.bold("[INFO]"),
		...args.map((arg) => chalk.blue(arg)),
	);
}
