import { Workers } from "@vortecx/cli-forger";
import { Extensions } from ".";

export function capitalizeFirstLetter(
  workers: Workers<Extensions>,
  string: string,
): string {
  if (string.length === 0) return string;
  const newStr = workers.extensions.sanetizeString(string);

  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}