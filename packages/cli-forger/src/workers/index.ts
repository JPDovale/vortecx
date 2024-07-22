import * as files from "./files";
import * as path from "./path";
import * as folders from "./folders";
import * as logger from "./logger";
import * as templates from "./templates";
import * as prompt from "./prompt";
import * as ui from "./ui";
import figures from "./figures";

export type WorkersExtensions<T> = {
  [K in keyof T]: T[K] extends (arg: any, ...args: infer P) => infer R
    ? (...args: P) => R
    : never;
};

export type Workers<
  T extends {
    [x: string]: (args?: any) => any;
  },
> = typeof workers & {
  extensions: T;
};

export const workers = {
  files,
  folders,
  logger,
  figures,
  templates,
  path,
  prompt,
  ui,
};