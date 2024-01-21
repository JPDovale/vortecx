import { randomUUID } from "crypto"

export class UniqueId {
  private _value: string

  protected constructor(value: string) {
    this._value = value
  }

  static generate() {
    const newId = randomUUID()
    return new UniqueId(newId)
  }

  static reconstitute(value: string) {
    return new UniqueId(value)
  }

  get value() {
    return this._value
  }

  toString() {
    return this._value
  }

  equals(other: UniqueId) {
    if (this === other) return true
    return other.value === this.value
  }
}
