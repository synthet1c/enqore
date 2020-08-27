import Extendable, { ExtendableConfig, Config } from './Extendable'
import { Request, Response, Server } from 'express'
import { trace } from '../utils'
import Route, { RouteConfig } from './Route'
import { GraphQLSchema } from 'graphql'
import Base from './Base'
import File from './File'

export default class Module extends File {
  ['constructor'] = Module

  protected static _cache: Map<string, Module> = new Map()
  protected routes: any[] = []
  protected _config: ModuleConfig
  public url: string
  public name: string
  public key: string;

  constructor(config: ModuleConfig) {
    super(config)
    // this._config = config
    this.name = config.name
    this.url = config.url
    this.key = config.key
    this.routes = config.routes.map(
      (config: RouteConfig) => new Route(config, this)
    )
  }

  public async init(app: Server, schema: GraphQLSchema) {
    return Promise.all(
      this.routes.map((route: Route) => route.init(app, this, schema))
    )
  }

  getRoutes() {
    return this.routes
  }

  static getByName(name: string) {
    return Module._cache.get(name)
  }
}

export interface ModuleConfig {
  key: string
  name: string
  routes: any[]
  url: string
  file: string
}
