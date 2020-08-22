import Extendable, { ExtendableConfig } from './Extendable'
import File from './File'
import { Request, Response, Server } from 'express'
import { trace } from '../utils'

export default class Module extends Extendable {
  protected static _cache: Map<string, Module> = new Map()
  protected _routes: any[] = []
  protected _config: ModuleConfig
  ['constructor'] = Module

  constructor(_config: ModuleConfig) {
    super(_config)
    this.initRoutes()
  }

  getRoutes() {
    return this._routes
  }

  initRoutes() {
    this._routes = this._config.routes.reverse().map((route: any) => ({
      ...route,
      expressUrl: this._config.url + route.url.replace(/\{([\w-_]+)[:\w+]+\}/i, ':$1'),
      controller: File.getByName(route.controller)
    }))
  }

  initExpressRoutes(app: Server) {
    this._routes.forEach(route => {
      app.use(route.expressUrl, (req: Request, res: Response) => {
        res.json(trace('initExpressRoutes')({
          route,
          params: req.params,
        }))
      })
    })
  }

  public static getEntries(): IterableIterator<[string, Extendable]> {
    return Module._cache.entries()
  }

  public static getByName(name: string): Extendable {
    return Module._cache.get(name)
  }

  public getExtensionObject(): Module | {} {
    if (typeof this._config.extends === 'string') {
      const _file = File.getByName(this._config.extends)
      if (_file) {
        return _file
      }
      return Module._cache.get(this._config.extends)
    }
    return {}
  }

  static of(_config: ModuleConfig): Module {
    return new Module(_config)
  }
}

export interface ModuleConfig extends ExtendableConfig {
  routes: any[]
  url: string
}
