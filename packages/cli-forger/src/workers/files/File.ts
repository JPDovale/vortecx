import fs from "node:fs/promises";
import { ValueObject } from "../../base/valueObject";
import type { Optional } from "../../types/optional";

export enum FileType {
  JSON = "json",
  TEXT = "text",
}

interface FileProps {
  path: string;
  rawContent: string;
  type: FileType;
  jsonContent: { [x: string | number]: any } | null;
}

export class File extends ValueObject<FileProps> {
  static create(props: Optional<FileProps, "jsonContent" | "type">) {
    const isJson = File.rawIsJson(props.rawContent);

    const fileProps: FileProps = {
      path: props.path,
      rawContent: props.rawContent,
      type: isJson ? FileType.JSON : props.type ?? FileType.TEXT,
      jsonContent: isJson
        ? JSON.parse(props.rawContent)
        : props.jsonContent ?? null,
    };

    const file = new File(fileProps);
    return file;
  }

  get path() {
    return this.props.path;
  }

  get(key?: string) {
    if (!key) {
      return this.props.rawContent;
    }

    if (this.props.type === FileType.JSON && this.props.jsonContent) {
      return key
        .split(".")
        .reduce(
          (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
          this.props.jsonContent as any,
        );
    }

    return undefined;
  }

  set(value: any, key?: string) {
    if (this.props.type !== FileType.JSON || !key) {
      this.props.rawContent = `${value}`;
      return;
    }

    if (this.props.jsonContent) {
      const keys = key.split(".");
      let current = this.props.jsonContent;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        // Se a chave não existir, ou não for um objeto, crie um novo objeto
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        }

        current = current[key];
      }

      // Defina o valor na última chave
      current[keys[keys.length - 1]] = value;
    }

    this.props.rawContent = JSON.stringify(this.props.jsonContent, null, 2);
  }

  async save() {
    return fs.writeFile(this.props.path, this.props.rawContent);
  }

  static rawIsJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
}
