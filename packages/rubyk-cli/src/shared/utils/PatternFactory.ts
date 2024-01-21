interface PatternOption {
  module: string
  name: string
  file: string
  type: string
}

export class PatterFactory {
  static create(pattern: string, options: PatternOption) {
    return pattern.trim().replace(' ', '')
      .replace('-{module}-', options.module?.toLocaleLowerCase())
      .replace('-{name}-', options.name?.toLocaleLowerCase())
      .replace('-{file}-', options.file?.toLocaleLowerCase())
      .replace('-{type}-', options.type?.toLocaleLowerCase())
      .replace('-{^type}-', options.type[0]?.toLocaleUpperCase() + options.type?.slice(1))
      .replace('-{^module}-', options.module[0]?.toLocaleUpperCase() + options.module?.slice(1))
      .replace('-{^name}-', options.name[0]?.toLocaleUpperCase() + options.name?.slice(1))
      .replace('-{^file}-', options.file[0]?.toLocaleUpperCase() + options.file?.slice(1))
      .replace('-{^^type}-', options.type[0]?.toLocaleUpperCase() + options.type?.slice(1))
      .replace('-{^^module}-', options.module?.toLocaleUpperCase())
      .replace('-{^^name}-', options.name?.toLocaleUpperCase())
      .replace('-{^^file}-', options.file?.toLocaleUpperCase())
  }
}