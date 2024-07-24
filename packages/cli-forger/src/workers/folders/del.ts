import fs from "node:fs/promises";
import { workers } from "..";

export async function del(rawPath: string | string[]) {
	const path = workers.path.getPath(rawPath);
	const folderExists = await workers.folders.exists(path);

	if (folderExists) {
		await fs.rmdir(path, { recursive: true });
	}
}
