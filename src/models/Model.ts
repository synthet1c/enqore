import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLBoolean,
  GraphQLNullableType,
} from 'graphql'

export interface Cache {
  name: Map<string, Model>
  type: Map<Model, any>
}

export const Cache = {
  name: new Map(),
  type: new Map(),
}

type GraphQLType =
  | GraphQLScalarType
  | GraphQLObjectType
  | GraphQLNonNull<any>
  | GraphQLList<any>

export interface FieldArgs {
  [key: string]: {
    type: GraphQLType
  }
}

export interface ResolveArgs {
  [key: string]: any
}

export interface GraphQLField {
  type: GraphQLType
  resolve?: (parent: Record, args: any) => Promise<any>
  args?: ResolveArgs
  description?: string
}

export interface Join {
  type: 'oneToMany' | 'manyToMany' | 'oneToOne' | 'manyToOne'
  table: string
  foreign: string
  local: string

  [key: string]: any
}

export interface ModelJSON {
  name: string
  table: string
  description: string
  order: string[]
  fields: ModelFields
  methods: any
}

export interface ModelFields {
  [key: string]: ModelField
}

export interface ModelField {
  type: string
  name: string
  table: string
  field: string
  list?: boolean
  required?: boolean
  description?: string
  searchable?: boolean
  findable?: boolean
  filterable?: boolean
  foreign?: boolean
  args?: any | FieldArgs // fixme: need to fix FieldArgs interface
  join?: any | Join // fixme: need to fix Join interface
}

import { db, Record } from '../db'
import { trace } from '../utils'
import RootQuery from './RootQuery'

export default class Model {
  private readonly schema: any
  // private readonly rootQuery: any
  public readonly graphQLType: GraphQLType
  public readonly name: string
  public readonly table: string

  constructor(schema: ModelJSON) {
    this.schema = schema
    this.name = schema.name
    this.table = schema.table
    this.graphQLType = this.initGraphQL()

    Cache.name.set(this.name, this)
  }

  initGraphQL(): GraphQLType {
    return new GraphQLObjectType({
      name: this.schema.name,
      fields: () => {
        const _fields: { [key: string]: any } = {}
        const entries = Object.entries(this.schema.fields)
        for (let [key, value] of entries) {
          // @ts-ignore
          _fields[key] = this.createGraphQLField(value)
        }
        return _fields
      },
    })
  }


  createGraphQLField(field: ModelField): GraphQLField {
    const type = this.getGraphQLFieldType(field)
    const joinType = field?.join?.type
    const _field: GraphQLField = {
      type,
    }

    // handle data oneToMany relationships
    if (joinType === 'oneToMany') {
      _field.resolve = (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[field.join.table].search({
          [field.join.foreign]: parent[field.join.local || 'id'],
        })
      }
    }

    // handle data manyToMany relationships
    else if (joinType === 'manyToMany') {
      _field.resolve = (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[field.join.table].searchIn(trace('searchIn')({
          [field.join.foreign]: parent[field.join.local],
        }))
      }
    }

    // handle data manyToOne relationships
    else if (joinType === 'manyToOne') {
      _field.resolve = (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[field.join.table].findIn({
          [field.join.foreign]: parent[field.join.local],
        })
      }
    }

    else if (joinType === 'oneToOne') {
      _field.resolve = (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[field.join.table].find({
          [field.join.foreign]: parent[field.join.local || 'id'],
        })
      }
    }

    if (field.args) {
      _field.args = {}
      for (let [key, value] of Object.entries(field.args)) {
        _field.args[key] = {
          // @ts-ignore
          type: this.getGraphQLType(value),
        }
      }
    }

    return _field
  }

  getGraphQLFieldType(field: ModelField): GraphQLType {
    const joinType = field?.join?.type
    if (joinType === 'oneToMany' || joinType === 'manyToMany') {
      // recursively call getGraphQLType, but change `foreign` so we dont keep nesting
      return GraphQLList(this.getGraphQLType(field.type))
    }
    return this.getGraphQLType(field.type)
  }

  getGraphQLType(type: string): GraphQLType {
    // generic GraphQLType
    switch (type) {
      case 'string':
      case 'str':
        return GraphQLString
      case 'integer':
      case 'int':
        return GraphQLInt
      case 'boolean':
        return GraphQLBoolean
      case 'id':
        return GraphQLInt
    }
    // dynamic type from Model
    return this.getDynamicGraphQLType(type)
  }

  getDynamicGraphQLType(type: string): GraphQLType {
    const foreign = Cache.name.get(type)
    if (!foreign) {
      throw new Error(`Cannot find Model ${type}`)
    }
    return foreign.graphQLType
  }

  static getType(type: string): GraphQLType {
    return Cache.name.get(type)?.graphQLType
  }

  static entries(type: string): IterableIterator<[any, any]> {
    return Cache.name.entries()
  }

  initElasticSearch() {}
}
