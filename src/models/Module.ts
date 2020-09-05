import Extendable, { ExtendableConfig, Config } from './Extendable'
import { Request, Response, Server } from 'express'
import { trace } from '../utils'
import Route, { RouteConfig } from './Route'
import { GraphQLSchema } from 'graphql'
import Base from './Base'
import File from './File'
import { Db } from 'mongodb'

export default class Module extends File {
  ['constructor'] = Module

  protected static _cache: Map<string, Module> = new Map()
  public routes: any[] = []
  protected _config: ModuleConfig
  public url: string
  public name: string
  public key: string

  constructor(config: ModuleConfig) {
    super(config)
    // this._config = config
    this.name = config.name
    this.url = config.url
    this.key = config.key
    Module._cache.set(config.key, this)
    this.routes = config.routes.map(
      (config: RouteConfig) => new Route(config, this)
    )
  }

  public async init(app: Server, schema: GraphQLSchema, Db: Db) {
    return Promise.all(
      this.routes.map((route: Route) => route.init(app, this, schema, Db))
    )
  }

  getRoutes() {
    return this.routes
  }

  static getByName(name: string) {
    return Module._cache.get(name)
  }

  static entries() {
    return Module._cache.entries()
  }
}

export interface ModuleConfig {
  key: string
  name: string
  routes: any[]
  url: string
  file: string
}
