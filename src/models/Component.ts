import Extendable, { ExtendableConfig } from './Extendable'
import File from './File'

export default class Component extends Extendable {
  protected static _cache: Map<string, Component> = new Map()

  constructor(_config: ComponentConfig) {
    super(_config)
    Component._cache.set(_config.key, this)
  }

  public static getLayout(name: string): Component | void {
    return Component._cache.get(name)
  }

  public static getEntries(): IterableIterator<[string, Extendable]> {
    return Component._cache.entries()
  }

  public static getByName(name: string): Extendable {
    return Component._cache.get(name)
  }

  public getExtensionObject(): Component | {} {
    if (typeof this._config.extends === 'string') {
      const _file = File.getByName(this._config.extends)
      if (_file) {
        return _file
      }
      return Component._cache.get(this._config.extends)
    }
    return {}
  }

  public static of(_config: ComponentConfig): Component {
    return new Component(_config)
  }
}

interface ComponentConfig extends ExtendableConfig {
}