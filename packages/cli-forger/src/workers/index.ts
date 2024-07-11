import * as files from "./files";
import * as path from "./path";
import * as folders from "./folders";
import * as logger from "./logger";
import * as templates from "./templates";
import * as prompt from "./prompt";
import figures from "./figures";

export type Workers = typeof workers;

export const workers = {
  files,
  folders,
  logger,
  figures,
  templates,
  path,
  prompt,
};