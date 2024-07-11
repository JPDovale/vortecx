import { workers } from "..";

export function save(
  templatePath: string | string[],
  destinationPath: string | string[],
  data?: { [x: string | number]: any },
) {
  const output = workers.templates.populate(templatePath, data);

  const newFile = workers.files.create(destinationPath, output);

  newFile.save();
}