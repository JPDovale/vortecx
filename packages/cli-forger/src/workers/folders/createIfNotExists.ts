import fs from "node:fs/promises";
import { cwd } from "node:process";
import { isArray } from "lodash";
import { workers } from "../index";

interface CreateIfNotExistsOptions {
	exitOnExists?: boolean;
	messageWhenExists?: string;
	showInfosLog?: boolean;
}

export async function createIfNotExists(
	rawPath: string[] | string,
	options: CreateIfNotExistsOptions = {},
) {
	const {
		exitOnExists = true,
		messageWhenExists = " Path already exists!",
		showInfosLog = false,
	} = options;
	const pathsToFind = isArray(rawPath) ? rawPath : [rawPath];

	if (pathsToFind.length === 0) {
		workers.logger.exit.error(
			"Path is missing!",
			`folders.createIfNotExists ${workers.figures.pointer} ${cwd()}`,
		);
	}
	const pathToFind = workers.path.getPath(rawPath);
	const existsPath = await workers.folders.exists(rawPath);

	if (exitOnExists && existsPath) {
		workers.logger.exit.error(
			messageWhenExists,
			`folders.createIfNotExists ${workers.figures.pointer} ${cwd()}`,
			`              exists.path ${workers.figures.pointer} ${pathToFind}`,
		);
	}

	if (!exitOnExists && existsPath && showInfosLog) {
		workers.logger.info(messageWhenExists);
	}

	if (!existsPath) {
		try {
			if (showInfosLog) {
				workers.logger.info(
					` Creating folder ${workers.figures.pointer} ${pathToFind}`,
				);
			}
			await fs.mkdir(pathToFind, { recursive: true });
		} catch (err) {
			workers.logger.exit.error("Cannot create folder", pathToFind, err);
		}
	}
}
