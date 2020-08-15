import Field, { FieldConfig } from './Field'
import { PageComponent } from './Page'
import Extendable, { Config, ExtendableConfig } from './Extendable'

export default class Layout extends Extendable {
  protected static _cache: Map<string, Layout> = new Map()
  protected _fields: Field[]
  private _blocks: any
  private _convertedBlocks: any

  constructor(protected readonly _config: LayoutConfig) {
    super(_config)
    Layout._cache.set(_config.key, this)
    this.initFields()
    this.initBlocks()
  }

  public initFields() {
    this._fields = Object.entries(
      this._config.fields
    ).map(([key, value]: any) => Field.getByName(key))
  }

  private initBlocks() {
    this._blocks = []

    const traverse = (obj: {}, acc: {} = {}): {} => {
      return Object.entries(obj).reduce((_acc: {}, [key, value]) => {
        if (Array.isArray(value)) {
          return value.map((x) => traverse(x, _acc))
        }
        // @ts-ignore
        if (value.type === 'block') {
          // @ts-ignore
          _acc[value.name] = value
        }
        // @ts-ignore
        if (value.components) {
          // @ts-ignore
          return traverse(value.components, _acc)
        }
        return _acc
      }, acc)
    }

    this._blocks = traverse(this._config.components)

    // this._convertedBlocks = this.convertBlocks()
  }

  public convertBlocks(blocks: any) {
    return Layout.traverseComponents(this._config.components, 'block', (x: {}) => {
      console.log('blocks', blocks)
      // @ts-ignore
      if (typeof blocks !== 'undefined') {
        // @ts-ignore
        return blocks[x.name]
      }
      return x
    })
  }

  public static traverseComponents = (
    components: any[],
    type: string,
    fn: (x: any) => any
  ): any[] => {
    return components.map((component) => {
      if (component.type === type) {
        return fn(component)
      }
      if (component.components) {
        component.components = Layout.traverseComponents(component.components, type, fn)
      }
      return component
    })
  }

  public replaceBlocks(blocks: any) {}

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
