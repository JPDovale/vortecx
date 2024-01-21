import { Generator } from '../../../modules/generator/entities/Generator'
import { Entity } from '../../../shared/core/entities/Entity'
import {Config as ConfigType} from 'src/types'


export interface ConfigProps {
  generators: Generator[]
}

export interface ConfigOptions {
  module: string
  file: string
  type: string
}

export class Config extends Entity<ConfigProps> {
  static create(config: ConfigType, options: ConfigOptions) {
    const opt = { ...options, file: options.file ?? 'index' }
    return new Config({
      generators: config.generators.map((gen) => Generator.create(gen, opt))
    })
  }

  findGenerator(type: string){
    const generator = this.props.generators.find(generator => 
      generator.type.toLocaleLowerCase() === type.toLocaleLowerCase() ||
      generator.alias?.toLocaleLowerCase() === type.toLocaleLowerCase()
    )

    return  generator ?? null
  }
}
