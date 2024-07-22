import { workers } from "..";

export async function save(
  templatePath: string | string[],
  destinationPath: string | string[],
  data?: { [x: string | number]: any },
) {
  const output = await workers.templates.populate(templatePath, data);

  const newFile = await workers.files.create(destinationPath, output);

  newFile.save();
}