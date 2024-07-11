import { execSync } from "child_process";
import { workers } from "..";

export function executeInFolder(
  executeInPath: string | string[],
  command: string,
) {
  const executionPath = workers.path.getCurrentPath();
  const executeIn = workers.path.getPath(executeInPath);

  try {
    execSync(`cd ${executeIn} && ${command} && cd ${executionPath}`);
  } catch (err) {
    workers.logger.exit.error(err, "[ERROR]");
  }
}