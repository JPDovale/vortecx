import { ConfigOptions } from 'src/modules/config/entities/Config'
import { GenericType } from '../../../modules/type/entities/GenericTypes'
import { Entity } from '../../../shared/core/entities/Entity'
import { MethodConfig } from '../../../types'
import { PatterFactory } from '../../../shared/utils/PatternFactory'
import { Optional } from 'src/shared/types/Optional'

export interface MethodProps {
  name: string
  annotations: string[]
  properties: {
    annotation: string
    name: string
    type: GenericType[]
  }[]
  returns: {
    type: GenericType[]
  }
  module: string
  file: string
  type: string
}

export class Method extends Entity<MethodProps> {
  static create(props: Optional<MethodConfig, 'annotations' | 'properties'>, options: ConfigOptions){
    return new Method({
      name: props.name,
      annotations: props.annotations ?? [],
      properties: props.properties?.map(prop => ({
        annotation: prop.annotation,
        name: prop.name,
        type: prop.type?.map((generic) => GenericType.create(generic, options)) ?? []
      })) ?? [],
      returns: {
        type: props.returns?.type?.map((generic) => GenericType.create(generic, options)) ?? []
      },
      module: options.module,
      file: options.file,
      type: options.type
    })
  }

  get name() {
    return PatterFactory.create(this.props.name, this.props)
  }

  get annotations() {
    return this.props.annotations
  }

  get properties() {
    return this.props.properties
  }

  get returns() {
    return this.props.returns
  }


}
