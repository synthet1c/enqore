import Field, { FieldConfig } from './Field'
import { PageComponent } from './Page'
import Extendable, { Config, ExtendableConfig } from './Extendable'
import Component, { ComponentJSON } from './Component'
import { trace } from '../utils'
import { clone } from 'rambda'

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

    Layout.mapComponents(
      this._config.components,
      (component: ComponentJSON) => {
        if (component.type === 'block') {
          this._blocks.push(component.name)
        }
        return component
      }
    )
  }

  public convertBlocks(blocks: any) {
    return Layout.mapComponents(
      this._config.components,
      (component: ComponentJSON) => {
        if (component && component?.type === 'block') {
          component.components = (trace('block')(blocks) && blocks[component.block]) || []
        }
        return component
      }
    )
  }

  public static mapComponents = (
    components: any[],
    fn: (x: ComponentJSON) => ComponentJSON
  ): ComponentJSON[] => {
    return components.map((component) => {
      if (component.components) {
        component.components = Layout.mapComponents(component.components, fn)
      }
      return fn({ ...component })
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
