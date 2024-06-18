import { Generator } from '../../../modules/generator/entities/Generator'
import { Entity } from '../../../shared/core/entities/Entity'
import { Config as ConfigType } from 'src/types'
import { Starter } from 'src/plugins/InfraGeneratorsStarters'

export interface Module {
  name: string
  plural: string
}

export interface ConfigProps {
  generators: Generator[]
  modules: Module[]
  options: ConfigOptions
}

export interface ConfigOptions {
  module: string
  pluralModule: string
  file: string
  type: string
  starters?: Starter[]
}

export class Config extends Entity<ConfigProps> {
  static create(config: ConfigType, options: ConfigOptions) {
    const opt = {
      ...options,
      file: options.file ?? 'index',
      pluralModule: options.pluralModule ?? `${options.module}s`,
      starters: options.starters ?? [],
    }

    return new Config({
      generators: config.generators.map((gen) => Generator.create(gen, opt)),
      modules: [],
      options: opt,
    })
  }

  findGenerator(type: string) {
    const generator = this.props.generators.find(
      (generator) =>
        generator.type.toLocaleLowerCase() === type.toLocaleLowerCase() ||
        generator.alias?.toLocaleLowerCase() === type.toLocaleLowerCase(),
    )

    return generator ?? null
  }

  get generators() {
    return this.props.generators
  }

  get modules() {
    return this.props.modules
  }

  get options() {
    return this.props.options
  }

  set options(options: ConfigOptions) {
    this.props.options = options
  }
}
