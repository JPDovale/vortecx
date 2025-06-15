import { execSync } from "node:child_process";
import { workers } from "..";

export function executeInFolder(
  executeInPath: string | string[],
  command: string,
  logResult: boolean = true,
) {
  const executionPath = workers.path.getCurrentPath();
  const executeIn = workers.path.getPath(executeInPath);

  try {
    const result = execSync(
      `cd ${executeIn} && ${command} && cd ${executionPath}`,
    );

    if (logResult) {
      workers.logger.info(result);
    }
  } catch (err) {
    workers.logger.exit.error(err, "[ERROR]");
  }
}