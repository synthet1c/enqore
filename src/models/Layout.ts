import Field, { FieldConfig } from './Field'
import { PageComponent } from './Page'
import Extendable, { Config, ExtendableConfig } from './Extendable'
import Component, { ComponentJSON } from './Component'
import { trace } from '../utils'
import { clone } from 'rambda'

export default class Layout {
  protected readonly _config: any
  private _components: any[]
  public components: any[]
  public description: string
  public fields: Field[]
  public meta: any
  public name: string
  public template: string

  constructor(config: any) {
    // this._config = _config
    this.name = config.name
    this.description = config.description
    this.template = config.template
    this.meta = config.meta
    this.components = config.components
    this.fields = config.fields
    this.initFields()
  }

  private initFields() {
    // this._config.fields.map((field: any) => new Field(field))
  }

  public initBlocks(blocks: any) {
    this.components = Layout.mapComponents(
      this.components,
      (component: any) => {
        if (blocks[component.name])
          component.components = clone(blocks[component.name])
        return component
      }
    )
  }

  static mapComponents(components: any[], fn = (x: any) => x): any[] {
    return (components || []).map((component: any) => ({
      ...fn(component),
      components: Layout.mapComponents(component.components, fn),
    }))
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
