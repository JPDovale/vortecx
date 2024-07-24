import type { WorkersExtensions } from "@vortecx/cli-forger";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { loadConfig } from "./loadConfig";
import { sanitizeString } from "./sanitizeString";

export const extensions = {
	loadConfig,
	sanitizeString,
	capitalizeFirstLetter,
};

export type Extensions = WorkersExtensions<typeof extensions>;
