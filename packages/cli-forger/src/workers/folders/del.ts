import fs from "fs";
import { workers } from "..";

export function del(rawPath: string | string[]) {
  const path = workers.path.getPath(rawPath);

  if (workers.folders.exists(path)) {
    fs.rmSync(path, { force: true, recursive: true });
  }
}