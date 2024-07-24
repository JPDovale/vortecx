import { cwd } from "node:process";
import { isString } from "lodash";
import { workers } from "../index";
import { File } from "./File";

interface CreateOptions {
	exitOnExists?: boolean;
	updateOnExists?: boolean;
	messageWhenExists?: string;
	showInfosLog?: boolean;
}

export async function create(
	rawPaths: string[] | string,
	content: { [x: number | string]: any } | string,
	options: CreateOptions = {},
) {
	const {
		showInfosLog = false,
		exitOnExists = true,
		updateOnExists = false,
		messageWhenExists = " File already exists!",
	} = options;

	const path = workers.path.getPath(rawPaths);
	const fileExists = await workers.files.exists(path);

	if (fileExists && exitOnExists) {
		workers.logger.exit.error(
			messageWhenExists,
			`files.create ${workers.figures.pointer} ${cwd()}`,
			` create.path ${workers.figures.pointer} ${path}`,
		);
	}

	if (fileExists) {
		const file = await workers.files.read(path);

		if (updateOnExists) {
			if (showInfosLog) {
				workers.logger.info(` File ${path} already exists`);
				workers.logger.info(` Updatind`);
			}

			file.set(content);
			await file.save();
		}

		return file;
	}

	const file = File.create({
		path,
		rawContent: isString(content) ? content : JSON.stringify(content, null, 2),
	});

	if (showInfosLog) {
		workers.logger.info(` Creating file ${workers.figures.pointer} ${path}`);
	}

	await file.save();

	return file;
}
