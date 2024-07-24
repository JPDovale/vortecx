export class ValueObject<T> {
  private _props: T;

  protected constructor(props: T) {
    this._props = props;
  }

  protected get props() {
    return this._props;
  }
}
