import Extendable, { ExtendableConfig } from './Extendable'
import File from './File'
import Layout from './Layout'
import Component, { ComponentJSON } from './Component'
import { trace } from '../utils'
import { Request, Response, Server } from 'express'
import { clone } from 'rambda'

export default class Route extends Extendable {
  protected static _cache: Map<string, Route> = new Map()
  protected _config: RouteConfig
  protected _layout: File
  protected _layoutConfig: any
  private __preparedLayoutConfig: ComponentJSON[]

  constructor(_config: RouteConfig) {
    super(_config)
    Route._cache.set(_config.key, this)
    this.initLayout()
  }

  public initLayout() {
    this._layout = File.getByName(this._config.layout)
    // @ts-ignore
    this._layoutConfig = this._layout.convertBlocks(this._config.blocks)

    this.__preparedLayoutConfig = this.prepareComponents()
    console.log('route', this)
  }

  public prepareComponents() {
    return Layout.mapComponents(
      this._layoutConfig,
      (component: ComponentJSON): ComponentJSON => {
        const _component = Component.prepareComponent(component)
        return _component
      }
    )
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

interface RouteConfig extends ExtendableConfig {
  layout: string
  blocks: any
}
