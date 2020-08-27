import readFile from '../utils/readFile'
import Controller from './Controller'
import Module from './Module'
import { Server, Request, Response } from 'express'
import Field from './Field'
import { evalObject, trace } from '../utils'
import { GraphQLSchema, graphql } from 'graphql'
import { promises as fs } from 'fs'
import { dirname } from 'path'
import { File } from '../utils/readFile'
import Base, { BaseConfig } from './Base'
import { omit } from 'rambda'

const omitPrivates = omit(['_cache', '_schema'])

export default class Route extends Base {
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
  private query: string;
  public file: any

  ['constructor'] = Route

  constructor(config: RouteConfig, parent: any) {
    super(config)
    // this._config = config
    this.parent = parent
    this.file = parent.file
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

    const convertProps = (converter: any) => (props: any) => {
      return Object.entries(converter).reduce((acc: any, [key, value]: [string, string]) => {
        if (acc[key]) {
          return omit([key], {
            ...acc,
            [value]: acc[key]
          })
        }
        return acc
      }, props)
    }

    if (this.controller.query) {
      graphql(trace('graphQlQuery')({
        schema: this.schema,
        source: this.controller.query,
        variableValues: convertProps(this.params)(req.params),
        // variableValues: {
        //   id: 7,
        // },
      }))
        .then((response) => {
          console.log('response', response)
          this.data = response.data
          res.json({
            params: req.params,
            // blocks: this.controller.blocks,
            layout: this.controller.layout,
            fields: this.controller.fields,
            data: response.data
          })
        })
        .catch(trace('error'))
    }
    else {
      res.json({
        params: req.params,
        // blocks: this.controller.blocks,
        layout: this.controller.layout,
        fields: this.controller.fields,
      })
    }

  }

  public init(app: Server, module: Module, schema: GraphQLSchema) {
    this._schema = schema
    app.get(module.url + this.url, this.onRoute)
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
