import { Workers } from "@vortecx/cli-forger";
import { Extensions } from ".";

export function sanetizeString(
  _workers: Workers<Extensions>,
  string: string,
): string {
  if (string.length === 0) return string;
  const controlCharsRegex = /[\x00-\x1F\x7F-\x9F]|\x1B\[.*?m/g;
  let sanitized = string.replace(controlCharsRegex, "");

  sanitized = sanitized.toLowerCase();

  // Remove barras e espaços em branco
  sanitized = sanitized.replace(/[\/\\]/g, ""); // Remove barras
  sanitized = sanitized.replace(/\s+/g, ""); // Remove espaços em branco

  // Remove acentos
  sanitized = sanitized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove caracteres não imprimíveis (não-ASCII)
  sanitized = sanitized.replace(/[^\x20-\x7E]/g, "");

  // Remove caracteres especiais comuns de shell
  const specialCharsRegex = /[|&;`'<>]/g;
  sanitized = sanitized.replace(specialCharsRegex, "");

  // Remove caracteres de formato de texto (como tabulações)
  sanitized = sanitized.replace(/\t/g, "");

  return sanitized;
}