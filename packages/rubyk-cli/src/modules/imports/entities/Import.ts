import { PatterFactory } from '../../../shared/utils/PatternFactory'
import { Entity } from '../../../shared/core/entities/Entity'
import { ImportConfig } from '../../../types'
import { ConfigOptions } from 'src/modules/config/entities/Config'

export interface ImportProps {
  imports: string[]
  from: string
  module: string
  type: string
  file: string
  name: string
}

export class Import extends Entity<ImportProps> {
  static create(props: ImportConfig, options: ConfigOptions) {
    return new Import({
      imports: props.imports,
      from: props.from,
      file: options.file,
      module: options.module,
      type: options.type,
      name: ''
    })
  }

  get imports() {
    return this.props.imports.map(i => PatterFactory.create(i, this.props))
  }

  get from() {
    return PatterFactory.create(this.props.from, this.props)
  }
}
