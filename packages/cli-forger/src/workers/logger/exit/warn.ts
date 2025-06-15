import { workers } from "../../index";

export function warn(...args: unknown[]) {
  workers.logger.warn(...args);
  process.exit(0);
}