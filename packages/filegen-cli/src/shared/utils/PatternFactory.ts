interface PatternOption {
  module: string
  pluralModule: string
  name: string
  file: string
  type: string
}

export class PatterFactory {
  static create(pattern: string, options: PatternOption) {
    return pattern?.trim()
      .replace(/-\{module\}-/g, options.module[0]?.toLocaleLowerCase() + options.module?.slice(1))
      .replace(/-\{modules\}-/g, options.pluralModule[0]?.toLocaleLowerCase() + options.pluralModule?.slice(1))
      .replace(/-\{name\}-/g, options.name[0]?.toLocaleLowerCase() + options.name?.slice(1))
      .replace(/-\{file\}-/g, options.file[0]?.toLocaleLowerCase() + options.file?.slice(1))
      .replace(/-\{type\}-/g, options.type[0]?.toLocaleLowerCase() + options.type?.slice(1))
      .replace(/-\{\^type\}-/g, options.type[0]?.toLocaleUpperCase() + options.type?.slice(1))
      .replace(/-\{\^module\}-/g, options.module[0]?.toLocaleUpperCase() + options.module?.slice(1))
      .replace(/-\{\^modules\}-/g, options.pluralModule[0]?.toLocaleUpperCase() + options.pluralModule?.slice(1))
      .replace(/-\{\^file\}-/g, options.file[0]?.toLocaleUpperCase() + options.file?.slice(1))
      .replace(/-\{\^\^type\}-/g, options.type[0]?.toLocaleUpperCase() + options.type?.slice(1))
      .replace(/-\{\^\^module\}-/g, options.module?.toLocaleUpperCase())
      .replace(/-\{\^\^modules\}-/g, options.pluralModule?.toLocaleUpperCase())
      .replace(/-\{\^\^name\}-/g, options.name?.toLocaleUpperCase())
      .replace(/-\{\^\^file\}-/g, options.file?.toLocaleUpperCase())
  }
}