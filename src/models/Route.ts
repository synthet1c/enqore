import readFile from '../utils/readFile'
import Controller from './Controller'
import Module from './Module'
import { Server, Request, Response } from 'express'
import Field from './Field'
import { evalObject, trace, convertProps } from '../utils'
import { GraphQLSchema, graphql } from 'graphql'
import { promises as fs } from 'fs'
import { dirname } from 'path'
import { File } from '../utils/readFile'
import Base, { BaseConfig } from './Base'
import { omit, tap } from 'rambda'
import Component from './Component'

const omitPrivates = omit(['_cache', '_schema'])

export default class Route extends Base {
  ['constructor'] = Route

  protected _config: RouteConfig
  protected controller: any
  protected _schema: GraphQLSchema
  public data: any
  public fields: any
  public get: object
  public pagination: boolean
  public params: object
  public path: string
  public post: object
  public url: string
  public origUrl: string
  private query: string
  public file: any

  constructor(config: RouteConfig, parent: any) {
    super(config)
    // this._config = config
    this.parent = parent
    this.file = parent.file
    this.origUrl = config.url
    this.url = Route.convertUrl(config.url)
    this.params = config.params
    this.get = config.get
    this.controller = new Controller(readFile(config.controller), this)
    this.fields = Field.evaluate({
      ...config.fields,
      ...this.controller.layout.fields,
      ...this.controller.fields,
    })
  }

  private getData() {
    if (this.controller.data) {
      // this.query = readFile()
    }
  }

  private onRoute = (req: Request, res: Response) => {
    console.log('Route::onRoute', this)

    const data = {
      page: {
        title: 'This is the title',
        description: 'this is the description',
        number: 1337,
      },
      theme: {
        primary: '#3cf',
      },
    }

    return Promise.resolve(data)
      .then((data: any) => {
        if (!this.controller.query) return data

        return graphql(
          trace('graphQlQuery')({
            schema: this.schema,
            source: this.controller.query,
            variableValues: convertProps(this.params)(req.params),
          })
        )
          .then((response) => ({
            ...data,
            ...response.data,
          }))
          .catch(trace('error'))
      })
      .then(
        tap((data: any) => {
          console.log('response', data)
          this.data = data
          res.json(this.createResponse(data, req))
        })
      )
  }

  private createResponse(data: any, req: Request) {

    console.log('createResponse', data)
    const modules = Array.from(Module.entries()).map(([key, module]) => {
      return {
        url: module.url,
        routes: module.routes.map((route: any) => route.url)
      }
    })

    return {
      params: req.params,
      blocks: Object.keys(this.controller.blocks),
      modules,
      // layout: this.controller.layout,
      fields: this.controller.fields,
      components: Component.mapComponents((component) => {
        if (component.fields) {
          component.fields = evalObject(component.fields)(data)
        }
        if (component.params) {
          component.params = evalObject(component.params)(data)
        }
        return component
      }, this.controller.layout.components),
      meta: evalObject(this.controller.layout.meta)(data),
      data,
    }
  }

  public async init(app: Server, parent: Module, schema: GraphQLSchema) {
    this._schema = schema
    this.parent = parent
    return this.controller.init(this).then((x: any) => {
      app.get(parent.url + this.url, this.onRoute)
      return x
    })
  }

  static convertUrl(url: string) {
    return url.replace(/{(\w+)(?::(\w+))?}/gim, (_, name, type) => {
      switch (type) {
        case 'int':
          return `:${name}(\d+)`
        case 'string':
          return `:${name}`
      }
      return `:${name}`
    })
  }
}

export interface RouteConfig extends BaseConfig {
  controller: any
  url: string
  params: object
  get: object
  post: object
  fields: any
}
