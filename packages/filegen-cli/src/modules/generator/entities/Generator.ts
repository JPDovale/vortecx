import { Entity } from '../../../shared/core/entities/Entity'
import { GenericType } from '../../../modules/type/entities/GenericTypes'
import { GeneratorConfig} from '../../../types'
import { Method } from '../../../modules/method/entities/Method'
import { Import } from '../../../modules/imports/entities/Import'
import { Interface } from '../../../modules/interface/entities/Interface'
import { Type } from '../../../modules/type/entities/Type'
import { ConfigOptions } from '../../../modules/config/entities/Config'
import { PatterFactory } from '../../../shared/utils/PatternFactory'
import { Optional } from 'src/shared/types/Optional'

export interface GeneratorProps {
  name: string
  pattern: string
  module: string
  filename: string
  file: string
  type: string
  alias: string | null
  imports: Import[]
  extends: GenericType[]
  implements: GenericType[]
  annotations: string[]
  methods: Method[]
  interfaces: Interface[]
  types: Type[]
  test: 'unit' | 'integration' | 'e2e' | 'disabled'
  pluralModule: string
}

export class Generator extends Entity<GeneratorProps> {
  static create(
    config: Optional<
      GeneratorConfig, 
      | 'annotations' 
      | 'extends' 
      | 'filename' 
      | 'implements' 
      | 'imports' 
      | 'methods' 
      | 'pattern' 
      | 'types' 
      | 'interfaces' 
      | 'test'
      | 'alias'  
    >, 
    opt: ConfigOptions
  ) {
    const options = {...opt, type: config.type}

    return new Generator({
      name: config.name,
      type: config.type,
      imports: config.imports?.map((imp) => Import.create(imp, options)) ?? [],
      extends: config.extends?.map((generic) => GenericType.create(generic, options)) ?? [],
      implements: config.implements?.map((generic) => GenericType.create(generic, options)) ?? [],
      annotations: config.annotations ?? [],
      methods: config.methods?.map((mt) => Method.create(mt, options)) ?? [],
      interfaces: config.interfaces?.map((inter) => Interface.create(inter, options)) ?? [],
      types: config.types?.map((t) => Type.create(t, options)) ?? [],
      pattern: config.pattern ?? './-{name}-/-{module}-/',
      module: options.module,
      file: options.file,
      filename: config.filename ?? '-{file}-',
      test: config.test ?? 'unit',
      alias: config.alias ?? null,
      pluralModule: options.pluralModule
    })
  }

  get name() {
    return PatterFactory.create(this.props.name, this.props)
  }

  get filename() {
    return PatterFactory.create(this.props.filename, this.props)
  }

  get type() {
    return this.props.type
  }

  get imports() {
    return this.props.imports
  }

  get extends() {
    return this.props.extends
  }

  get annotations() {
    return this.props.annotations
  }

  get methods() {
    return this.props.methods
  }

  get interfaces() {
    return this.props.interfaces
  }

  get types() {
    return this.props.types
  }

  get path(){
    return PatterFactory.create(this.props.pattern, this.props)
  }

  get test() {
    return this.props.test
  }

  get implements() {
    return this.props.implements
  }

  get alias() {
    return this.props.alias
  }
}
