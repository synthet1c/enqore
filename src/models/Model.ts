import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} from 'graphql'

interface Cache {
  name: Map<string, Model>,
  type: Map<Model, any>,
}

const Cache = {
  name: new Map,
  type: new Map,
}


type GraphQLType =
  GraphQLScalarType
  | GraphQLObjectType
  | GraphQLNonNull<any>
  | GraphQLList<any>

interface FieldArgs {
  [key: string]: {
    type: GraphQLType
  }
}

interface ResolveArgs {
  [key: string]: any
}

interface GraphQLField {
    type: GraphQLType,
    resolve?: (parent: Record, args: any) => Promise<any>,
    args?: ResolveArgs,
    description?: string,
}



interface Join {
  type: 'oneToMany' | 'manyToMany' | 'oneToOne',
  table: string,
  foreign: string,
  local: string,
  [key: string]: any
}


interface SchemaField {
  type: string,
  name: string,
  table: string,
  field: string,
  list?: boolean,
  description?: string,
  searchable?: boolean,
  findable?: boolean,
  filterable?: boolean,
  foreign?: boolean,
  args?: any | FieldArgs, // fixme: need to fix FieldArgs interface
  join?: any | Join, // fixme: need to fix Join interface
}

import { db, Record } from '../db'

export default class Model {

  private readonly schema: any
  public readonly graphQLType: GraphQLType
  public readonly name: string
  public readonly table: string


  constructor(schema: any) {
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
        const _fields: {[key: string]: any} = {}
        // @ts-ignore
        for ([key, value] of Object.entries(this.schema.fields)) {
          // @ts-ignore
          _fields[key] =  this.createGraphQLField(value)
        }
        return _fields
      }
    })
  }


  createGraphQLField(field: SchemaField): GraphQLField {
    const type = this.getGraphQLType(field)
    const _field: GraphQLField = {
      type
    }

    // handle data oneToMany relationships
    if (field?.join?.type === 'oneToMany') {
      _field.resolve = (parent: Record, args: ResolveArgs) => {
        return db.find(field.join.table, {
          [field.join.foreign]: args[field.join.local],
          ...args
        })
      }
    }

    if (field.args) {
      _field.args = Object.keys(field.args).reduce((acc, key) => ({
        ...acc,
        [key]: { type: this.getGraphQLType(field.args[key]) }
      }), {})
    }

    return _field
  }


  getGraphQLType(field: SchemaField): GraphQLType {
    if (field.join) {
      // recursively call getGraphQLType, but change `foreign` so we dont keep nesting
      return GraphQLList(this.getGraphQLType({
        ...field,
        join: false,
      }))
    }
    // generic GraphQLType
    switch (field.type) {
      case 'string':
        return GraphQLString
      case 'integer':
        return GraphQLInt
      case 'id':
        return GraphQLNonNull(GraphQLInt)
    }
    // dynamic type from Model
    return this.getDynamicGraphQLType(field)
  }


  getDynamicGraphQLType(field: SchemaField): GraphQLType {
    const foreign = Cache.name.get(field.type)
    return foreign.graphQLType
  }


  initElasticSearch() {

  }
}