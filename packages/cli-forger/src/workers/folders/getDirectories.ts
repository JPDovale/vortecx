import fs from "fs";
import { workers } from "..";

export function getDirectories(rawPath: string | string[]) {
  const path = workers.path.getPath(rawPath);

  const dirs = fs.readdirSync(path).filter((name) => {
    const childPath = workers.path.getPath([path, name]);
    const childIsDirectory = fs.statSync(childPath).isDirectory();
    return childIsDirectory;
  });

  return dirs;
}
