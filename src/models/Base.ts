import { GraphQLSchema } from 'graphql'

export default class Base {
  protected _cache: Map<Base, Base> = new Map()

  get parent(): Base {
    return this._cache.get(this)
  }

  set parent(parent: Base) {
    this._cache.set(this, parent)
  }

  get schema(): GraphQLSchema {
    let instance = this
    while (instance) {
      // @ts-ignore
      if (instance._schema) return instance._schema
      // @ts-ignore
      instance = instance.parent
    }
  }

  constructor(options: BaseConfig) {}
}

export interface BaseConfig {
  [key: string]: any
}
