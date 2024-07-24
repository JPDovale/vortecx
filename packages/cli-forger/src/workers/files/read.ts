import fs from "node:fs/promises";
import path from "node:path";
import { cwd } from "node:process";
import { isArray } from "lodash";
import { workers } from "../index";
import { File } from "./File";

interface ReadOptions {
	exitOnNotExists?: boolean;
	messageWhenNotExists?: string;
}

export async function read(
	rawPath: string[] | string,
	options: ReadOptions = {},
) {
	const { exitOnNotExists = true, messageWhenNotExists = " File not found!" } =
		options;
	const rawPaths = isArray(rawPath) ? rawPath : [rawPath];
	const pathToRead = path.resolve(...rawPaths);
	const fileExist = await workers.files.exists(pathToRead);

	if (exitOnNotExists && !fileExist) {
		workers.logger.exit.error(
			messageWhenNotExists,
			`files.read ${workers.figures.pointer} ${cwd()}`,
			` read.path ${workers.figures.pointer} ${pathToRead}`,
		);
	}

	const file = File.create({
		path: pathToRead,
		rawContent: "",
	});

	if (!fileExist) {
		return file;
	}

	const content = await fs.readFile(pathToRead, "utf8");

	file.set(content);

	return file;
}
