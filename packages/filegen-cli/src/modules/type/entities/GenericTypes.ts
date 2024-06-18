import { PatterFactory } from '../../../shared/utils/PatternFactory'
import { Entity } from '../../../shared/core/entities/Entity'
import { GenericTypeConfig } from '../../../types'
import { ConfigOptions } from '../../../modules/config/entities/Config'
import { Optional } from 'src/shared/types/Optional'

export interface GenericTypeProps {
  name: string
  generics: GenericType[]
  module: string
  file: string
  type: string
  pluralModule: string

}

export class GenericType extends Entity<GenericTypeProps> {
  static createByProps(props: Optional<GenericTypeConfig, 'generics'>, options: ConfigOptions) {
    return new GenericType({
      generics: props.generics?.map((generic) => GenericType.create(generic, options)) ?? [],
      name: props.name,
      file: options.file,
      module: options.module,
      type: options.type,
      pluralModule: options.pluralModule
    })
  }

  static createByString(generic: string, options: ConfigOptions) {
    return GenericType.create({ name: generic, generics: []}, options)
  }

  static create(props: GenericTypeConfig | string, options: ConfigOptions) {
    if (typeof props === 'string') {
      return GenericType.createByString(props, options)
    }
    return GenericType.createByProps(props, options)
  }

  get name() {
    return PatterFactory.create(this.props.name, this.props)
  }

  get generics() {
    return this.props.generics
  }
}
