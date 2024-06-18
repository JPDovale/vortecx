import { Entity } from '../../../shared/core/entities/Entity'
import { GenericType } from './GenericTypes'
import { TypeConfig } from '../../../types'
import { PatterFactory } from '../../..//shared/utils/PatternFactory'
import { ConfigOptions } from '../../../modules/config/entities/Config'
import { Optional } from '../../../shared/types/Optional'

export interface TypeProps {
  name: string
  pattern: string
  export: boolean
  receive: GenericType[]
  module: string
  file: string
  type: string
  pluralModule: string
}

export class Type extends Entity<TypeProps> {
  static createByProps(props: Optional<TypeConfig, 'export' | 'pattern' | 'receive'>, options: ConfigOptions) {
    return new Type({
      name: props.name,
      pattern: props.pattern ?? props.name,
      export: props.export ?? false,
      receive: props.receive?.map((generic) => GenericType.create(generic, options)) ?? [],
      file: options.file,
      module: options.module,
      type: options.type,
      pluralModule: options.pluralModule
    })
  }

  static createByString(props: string, options: ConfigOptions){
    return Type.createByProps({name: props}, options)
  }

  static create(props: TypeConfig | string, options: ConfigOptions){
    if (typeof props === 'string') {
      return Type.createByString(props, options)
    }
    return Type.createByProps(props, options)
  }

  get name() {
    return PatterFactory.create(this.props.name, this.props)
  }

  get pattern() {
    return PatterFactory.create(this.props.pattern, this.props)
  }

  get export() {
    return this.props.export
  }

  get receive() {
    return this.props.receive
  }

}
