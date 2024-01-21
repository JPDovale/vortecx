interface PatternOption {
  module: string
  name: string
  file: string
  type: string
}

export class PatterFactory {
  static create(pattern: string, options: PatternOption) {
    return pattern?.trim()
      .replace(/-\{module\}-/g, options.module?.toLocaleLowerCase())
      .replace(/-\{name\}-/g, options.name?.toLocaleLowerCase())
      .replace(/-\{file\}-/g, options.file?.toLocaleLowerCase())
      .replace(/-\{type\}-/g, options.type?.toLocaleLowerCase())
      .replace(/-\{\^type\}-/g, options.type[0]?.toLocaleUpperCase() + options.type?.slice(1))
      .replace(/-\{\^module\}-/g, options.module[0]?.toLocaleUpperCase() + options.module?.slice(1))
      .replace(/-\{\^file\}-/g, options.file[0]?.toLocaleUpperCase() + options.file?.slice(1))
      .replace(/-\{\^\^type\}-/g, options.type[0]?.toLocaleUpperCase() + options.type?.slice(1))
      .replace(/-\{\^\^module\}-/g, options.module?.toLocaleUpperCase())
      .replace(/-\{\^\^name\}-/g, options.name?.toLocaleUpperCase())
      .replace(/-\{\^\^file\}-/g, options.file?.toLocaleUpperCase())
  }
}