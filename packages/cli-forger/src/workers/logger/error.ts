import chalk from "chalk";
import { workers } from "../index";

export function error(...args: unknown[]) {
	workers.logger.log(
		chalk.bgRed.black.bold("[ERROR]"),
		...args.map((arg) => chalk.red(arg)),
	);
}
