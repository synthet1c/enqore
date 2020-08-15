import Extendable, { ExtendableConfig } from './Extendable'
import File from './File'

export default class Route extends Extendable {
  protected static _cache: Map<string, Route> = new Map()

  constructor(_config: RouteConfig) {
    super(_config)
    Route._cache.set(_config.key, this)
  }

  public static getLayout(name: string): Route | void {
    return Route._cache.get(name)
  }

  public static getEntries(): IterableIterator<[string, Extendable]> {
    return Route._cache.entries()
  }

  public static getByName(name: string): Extendable {
    return Route._cache.get(name)
  }

  public getExtensionObject(): Route | {} {
    if (typeof this._config.extends === 'string') {
      const _file = File.getByName(this._config.extends)
      if (_file) {
        return _file
      }
      return Route._cache.get(this._config.extends)
    }
    return {}
  }

  public static of(_config: RouteConfig): Route {
    return new Route(_config)
  }
}

interface RouteConfig extends ExtendableConfig {}
