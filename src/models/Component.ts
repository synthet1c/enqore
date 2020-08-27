import Extendable, { ExtendableConfig } from './Extendable'
import VirtualFile from './VirtualFile'
import Field from './Field'
import path from 'path'

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
      const _file = VirtualFile.getByName(this._config.extends)
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

  public static prepareComponent(component: any): any {
    const obj = Component.getByName(component.type)
    if (!obj) return component

    const config = obj.getConfig()

    if (config?.data) {
      console.log('path', path.resolve(process.cwd(), 'src/', config.data))
    }

    return component

    return {
      ...component,
      ...(config?.data && {
        data: () => import(config.data).then((module: any) => module.data()),
      }),
    }
  }

  public static mapComponents(fn: (x: any) => any, components: any[]) {
    return components.map((component) => {
      const _component = fn(component)
      if (_component.components) {
        _component.components = Component.mapComponents(
          fn,
          _component.components
        )
      }
      return _component
    })
  }
}

export interface ComponentConfig extends ExtendableConfig {}

export interface ComponentJSON {
  type: string
  name: string
  key: string
  components: ComponentJSON[]
  fields?: Field[]
  block?: string
}
