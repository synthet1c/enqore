import { mergeDeepRight as merge } from 'rambda'
import Extendable, { ExtendableConfig } from './Extendable'

export default class Field extends Extendable {
  protected static _cache: Map<string, Field> = new Map()
  public default: string
  public description?: string
  public input: InputType
  public key: string
  public name: string
  public type: 'string' | 'integer'

  constructor(config: FieldConfig) {
    super(config)
    this.default = config.default
    this.description = config.description
    this.input = config.input
    this.key = config.key
    this.name = config.name
    this.type = config.type
    Field._cache.set(config.key, this)
  }

  public static getEntries(): IterableIterator<[string, Extendable]> {
    return Field._cache.entries()
  }

  public static getByName(name: string): Field {
    return Field._cache.get(name)
  }

  public getExtensionObject(): Field | void {
    if (typeof this._config.extends === 'string') {
      return Field._cache.get(this._config.extends)
    }
  }

  public static of(_config: FieldConfig) {
    return new Field(_config)
  }

  public static evaluate(fields: any) {
    const acc: any = {}
    for (const [key, value] of Object.entries(fields)) {
      const field = Field.getByName(key)
      acc[key] = value || field.default
    }
    return acc
  }
}

export interface FieldConfig extends ExtendableConfig {
  type: 'string' | 'integer'
  name: string
  key: string
  input: InputType
  description?: string
  default?: string
}

export type InputType =
  | 'text'
  | 'date'
  | 'color'
  | 'theme'
  | 'wysiwyg'
  | FieldSelect

export interface FieldSelect {
  type: 'select'
  options: FieldOption
  description?: string
  multiple?: boolean
}

export interface FieldOption {
  name: string
  value: string | number
  description?: string
}
