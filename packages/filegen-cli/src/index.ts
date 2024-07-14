#!/usr/bin/env node
"use strict";

export { type Config } from "./types";

import cli from "./cli";

cli.run(process.argv);