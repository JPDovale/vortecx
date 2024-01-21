import { PatterFactory } from '../../../shared/utils/PatternFactory'
import { GenericType } from '../../../modules/type/entities/GenericTypes'
import { Entity } from '../../../shared/core/entities/Entity'
import { InterfaceConfig } from '../../../types'
import { ConfigOptions } from '../../../modules/config/entities/Config'
import { Optional } from 'src/shared/types/Optional'

export interface InterfaceProps {
  name: string
  pattern: string
  extends: GenericType[] 
  export: boolean
  module: string
  file: string
  type: string
}

export class Interface extends Entity<InterfaceProps> {
  static createByProps(props: Optional<InterfaceConfig, 'extends' | 'export' | 'pattern'>, options: ConfigOptions){
    return new Interface({
      name: props.name,
      pattern: props.pattern ?? props.name,
      extends: props.extends?.map((generic) => GenericType.create(generic, options)) ?? [],
      export: props.export ?? false,
      file: options.file,
      module: options.module,
      type: options.type
    })
  }

  static createByString(props: string, options: ConfigOptions){
    return Interface.createByProps({name: props}, options)
  }

  static create(props: InterfaceConfig | string, options: ConfigOptions){
    if (typeof props === 'string') {
      return Interface.createByString(props, options)
    }
    return Interface.createByProps(props, options)
  }

  get name() {
    return  PatterFactory.create(this.props.name, this.props)
  }

  get pattern() {
    return PatterFactory.create(this.props.pattern, this.props)
  }

  get extends() {
    return this.props.extends
  }

  get export() {
    return this.props.export
  }
}
