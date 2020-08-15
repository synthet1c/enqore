import { FieldConfig } from './Field'
import { PageComponent } from './Page'
import Extendable, {
  Config,
  ExtendableConfig,
} from './Extendable'

export default class Layout extends Extendable {
  protected static _cache: Map<string, Layout> = new Map()

  constructor(protected readonly _config: LayoutConfig) {
    super(_config)
    Layout._cache.set(_config.key, this)
  }

  public static getLayout(name: string): Layout | void {
    return Layout._cache.get(name)
  }

  public static getEntries(): IterableIterator<[string, Extendable]> {
    return Layout._cache.entries()
  }

  public static getByName(name: string): Extendable {
    return Layout._cache.get(name)
  }

  public getExtensionObject(): Layout | {} {
    if (typeof this._config.extends === 'string') {
      return Layout._cache.get(this._config.extends)
    }
    return {}
  }

  public static of(_config: LayoutConfig) {
    return new Layout(_config)
  }
}

export interface LayoutConfig extends ExtendableConfig {
  name: string
  description?: string
  template: string
  fields: FieldConfig[]
  meta: Meta
  components: PageComponent[]
}

export interface Meta {
  [key: string]: any
}
