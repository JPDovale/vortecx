import { cwd } from "process";

export function getCurrentPath() {
  return cwd();
}