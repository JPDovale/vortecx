import mustache from "mustache";
import { workers } from "..";

export function populate(
  path: string | string[],
  data: { [x: string | number]: any },
) {
  const parsedPath = workers.path.getPath(path);
  const file = workers.files.read(parsedPath);
  const template = file.get();

  const output = mustache.render(
    template,
    data,
    {},
    {
      escape: (v) => v,
    },
  );
  return output;
}