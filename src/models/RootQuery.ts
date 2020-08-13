import Model, { ModelJSON, Cache, ModelFields, ResolveArgs } from './Model'
import { Record, db } from '../db'
import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql'
// @ts-ignore
import pluralize, { singular } from 'pluralize'
// @ts-ignore
import capitalize from 'capitalize'
import Schema from './Schema'
import ORM from './ORM'

const _cache: Map<string, RootQuery> = new Map()

export default class RootQuery {
  private readonly schema: any
  public readonly name: string
  public readonly table: string
  private findable: string[] = []
  private searchable: string[] = []
  private filterable: string[] = []
  private mutationFields: any[] = []
  private getters: any = {}
  private mutations: any = {}

  constructor(schema: ModelJSON) {
    this.schema = schema
    this.name = schema.name
    this.table = schema.table

    this.parseFieldDirectives(schema.fields)
    this.generateRootQueries()
    this.generateRootMutations(schema.fields)
  }

  parseFieldDirectives(fields: ModelFields): void {
    for (let [key, modelField] of Object.entries(fields)) {
      if (modelField?.findable) {
        this.findable.push(key)
      }
      if (modelField?.searchable) {
        this.searchable.push(key)
      }
      if (modelField?.filterable) {
        this.filterable.push(key)
      }
      if (modelField?.field === 'field') {
        this.mutationFields.push(key)
      }
    }
  }

  getRootQueries(): any {
    return this.getters
  }

  private generateRootQueries(): void {
    const args: any = {}
    const whereTypes: any = {}

    this.findable.forEach(key => {
      const field = this.schema.fields[key]
      const type = Schema.getGraphQLScalarType(field.type)

      if (!field.join) {
        args[key] = {
          type,
          description: `Get by ${key}`,
        }
      } else if (field?.join?.type === 'manyToMany') {
        args[key] = {
          type: GraphQLList(GraphQLInt),
          description: `Get by ${key}`,
        }
      }

      /*
      const SearchFieldType = new GraphQLInputObjectType({
        name: 'searchFields',
        description: 'filter your results',
        fields: () => searchFields,
      })

      let searchFields: any = {
        _eq: { type },
        _neq: { type },
        _and: { type: SearchFieldType },
        _or: { type: SearchFieldType },
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
      */
    })

    const pagination: any = {
      perPage: { type: GraphQLInt },
      start: { type: GraphQLInt },
      order: { type: GraphQLString },
      sort: { type: GraphQLString },
    }

    const detail: any = {
      type: Model.getType(this.schema.name),
      description: this.schema.description,
      args,
      resolve: (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[this.schema.table].find(args)
      },
    }

    const list: any = {
      type: GraphQLList(Model.getType(this.schema.name)),
      description: this.schema.description,
      args: {
        ...pagination,
        ...args,
        where: ORM.createSearchFields(this.schema, this.schema.fields),
      },
      resolve: (parent: Record, args: ResolveArgs) => {
        console.log('~', JSON.stringify(args, null, 2))
        if (args.where) {
          // @ts-ignore
          return db[this.schema.table].where(args)
        }
        // @ts-ignore
        return db[this.schema.table].search(args)
      },
    }

    this.getters[singular(this.schema.table)] = detail
    this.getters[pluralize(this.schema.table)] = list
  }

  getRootMutations(): any {
    return this.mutations
  }

  private generateRootMutations(fields: ModelFields): void {
    const args: any = {}
    const fieldName = capitalize(singular(this.schema.table))
    const schemaName = singular(this.schema.name)
    for (let [key, modelField] of Object.entries(fields)) {
      if (modelField?.field === 'field') {
        args[key] = {
          type: modelField?.required
            ? GraphQLNonNull(Schema.getGraphQLScalarType(modelField.type))
            : Schema.getGraphQLScalarType(modelField.type),
        }
      }
    }

    this.mutations[`insert${fieldName}`] = {
      type: Model.getType(this.schema.name),
      description: `Create a ${schemaName}`,
      args,
      resolve: (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[this.schema.table].create(args)
      },
    }

    this.mutations[`update${fieldName}`] = {
      type: Model.getType(this.schema.name),
      description: `Update a ${schemaName}`,
      args,
      resolve: (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[this.schema.table].update(args)
      },
    }

    this.mutations[`upsert${fieldName}`] = {
      type: Model.getType(this.schema.name),
      description: `Update or insert a ${schemaName}`,
      args,

      resolve: (parent: Record, args: ResolveArgs) => {
        // @ts-ignore
        return db[this.schema.table].create(args)
      },
    }
  }
}
