import { WorkersExtensions } from "@vortecx/cli-forger";
import { loadConfig } from "./loadConfig";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { sanetizeString } from "./sanetizeString";

export const extensions = {
  loadConfig,
  sanetizeString,
  capitalizeFirstLetter,
};

export type Extensions = WorkersExtensions<typeof extensions>;