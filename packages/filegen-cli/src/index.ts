#!/usr/bin/env node

export { type Config } from "./types";

import cli from "./cli";

cli.run(process.argv);
