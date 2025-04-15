import fs from "node:fs/promises";
import { workers } from "..";

export async function getDirectories(rawPath: string | string[]) {
  const path = workers.path.getPath(rawPath);

  const dirs = await fs.readdir(path);
  const directories: string[] = [];

  for (const dir of dirs) {
    const childPath = workers.path.getPath([path, dir]);
    const childStas = await fs.stat(childPath);
    const childIsDirectory = childStas.isDirectory();

    if (childIsDirectory) directories.push(childPath);
  }

  return directories;
}