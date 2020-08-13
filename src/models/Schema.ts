import Model, { ModelFields, ModelJSON, ModelField } from './Model'
import RootQuery from './RootQuery'
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql'

const _cache: Map<string, Schema> = new Map()

export default class Schema {
  private readonly schema: ModelJSON
  public readonly name: string
  public readonly table: string
  private readonly model: Model
  private readonly rootQuery: RootQuery

  private static readonly cache: Map<string, Schema> = new Map()

  constructor(json: ModelJSON) {
    this.schema = json
    this.name = json.name
    this.model = new Model(json)
    this.rootQuery = new RootQuery(json)
    Schema.cache.set(this.name, this)
  }

  getModel(): Model {
    return this.model
  }

  getRootQuery(): RootQuery {
    return this.rootQuery
  }

  getSchema(): ModelJSON {
    return this.schema
  }

  getEntries(): IterableIterator<[string, Schema]> {
    return Schema.cache.entries()
  }

  static getSchema(name: string): Schema | void {
    return Schema.cache.get(name)
  }

  static getModel(name: string): Model | void {
    if (Schema.cache.has(name)) return Schema.cache.get(name).model
    return null
  }

  static getRootQuery(name: string): RootQuery | void {
    if (Schema.cache.has(name)) return Schema.cache.get(name).rootQuery
    return null
  }

  static getRootQueryObject(): any {
    return Array.from(Schema.cache.entries()).reduce(
      (acc, [name, schema]) => ({
        ...acc,
        ...schema.getRootQuery().getRootQueries(),
      }),
      {}
    )
  }

  static createSearchInputs(fields: ModelFields): GraphQLInputObjectType {
    const _fields: any = {}

    for (const [name, field] of Object.entries(fields)) {
      const type = Schema.getGraphQLScalarType(field.type)
      _fields[name] = new GraphQLInputObjectType({
        name: 'innerWhere',
        fields: () => {
          return {
            _eq: { type },
          }
        },
      })
    }

    return new GraphQLInputObjectType({
      name: 'where',
      fields: () => _fields,
    })
  }

  static createSearchDirectives(name: string, field: ModelField) {
    const type = Schema.getGraphQLScalarType(field.type)
    const SearchFieldType = new GraphQLInputObjectType({
      name: `where_${name}_${field.name}`,
      description: 'filter your results',
      fields: () => searchFields,
    })

    let searchFields: any = {
      _eq: { type },
      _neq: { type },
      _and: { type: GraphQLList(SearchFieldType) },
      _or: { type: GraphQLList(SearchFieldType) },
    }

    if (field.type === 'int') {
      searchFields = {
        ...searchFields,
        _in: { type: GraphQLList(type) },
        _gt: { type },
        _lt: { type },
      }
    }

    if (field.type === 'string') {
      searchFields = {
        ...searchFields,
        _reg: { type },
      }
    }
  }

  static getGraphQLScalarType(type: string): GraphQLScalarType {
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
  }
}
