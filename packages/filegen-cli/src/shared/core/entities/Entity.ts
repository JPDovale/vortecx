
export class Entity<Props> {
  protected _props: Props

  protected constructor(props: Props) {
    this._props = props
  }

  protected get props() {
    return this._props
  }

  public equals(other: Entity<Props>) {
    if (this === other) return true

    if(JSON.stringify(this.props) === JSON.stringify(other.props)) {
      return true
    }

    return false
  }
}
