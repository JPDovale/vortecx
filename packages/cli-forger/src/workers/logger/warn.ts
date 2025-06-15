import chalk from "chalk";
import { workers } from "../index";

export function warn(...args: unknown[]) {
  workers.logger.log(
    chalk.bgYellow.black.bold("[WARN]"),
    ...args.map((arg) => chalk.yellow(arg)),
  );
}