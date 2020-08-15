import { mergeDeepRight as merge } from 'rambda'
import Extendable, { ExtendableConfig } from './Extendable'

export default class Field extends Extendable {
  protected static _cache: Map<string, Field> = new Map()

  constructor(_config: FieldConfig) {
    super(_config)
    Field._cache.set(_config.key, this)
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
}

export interface FieldConfig extends ExtendableConfig {
  type: 'string' | 'integer'
  name: string
  key: string
  input: InputType
  description?: string
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
