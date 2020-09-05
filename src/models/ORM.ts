import { ModelFields, ModelField, ModelJSON } from './Model'
import { GraphQLInputObjectType, GraphQLInt, GraphQLList } from 'graphql'
import Schema from './Schema'

/**
 * ORM
 *
 * query {
 *   record(where: {
 *     int: { _in: [1, 2 ]},
 *     string: { startsWith: "start" },
 *   })
 * }
 *
 * query {
 *   record(where: {
 *     _and: [
 *       { field1: { _eq: [1, 2] }},
 *       { field2: { _contains: "string" }},
 *     ]
 *   })
 * }
 *
 * query {
 *   record(where: {
 *     _or: [
 *       { field1: { _gt: 4 }},
 *       { field2: { _endsWith: "string" }},
 *     ]
 *   })
 * }
 */

export default class ORM {
  static createSearchFields(schema: ModelJSON, fields: ModelFields) {
    const WhereType = new GraphQLInputObjectType({
      name: `where_${schema.name}`,
      fields: () => {
        const _fields: any = {}
        for (const [key, field] of Object.entries(fields)) {
          if (!field.filterable) continue
          _fields[key] = {
            type: ORM.createSearchField(schema, field, WhereType),
          }
        }
        _fields._and = { type: GraphQLList(WhereType) }
        _fields._or = { type: GraphQLList(WhereType) }
        return _fields
      },
    })
    return {
      type: WhereType,
    }
  }

  static createSearchField(
    schema: ModelJSON,
    field: ModelField,
    WhereType: any
  ) {
    return new GraphQLInputObjectType({
      name: `where_${schema.name}_${field.name}`,
      fields: () => {
        const type = Schema.getGraphQLScalarType(field.type) || GraphQLInt
        let searchFields: any = {
          _eq: { type },
          _neq: { type },
          _and: { type: GraphQLList(WhereType) },
          _or: { type: GraphQLList(WhereType) },
        }

        if (field.type === 'id' || field.type === 'int' || field.join) {
          searchFields = {
            ...searchFields,
            _in: { type: GraphQLList(type) },
            _gt: { type },
            _gte: { type },
            _lt: { type },
            _lte: { type },
          }
        }

        if (field.type === 'string') {
          searchFields = {
            ...searchFields,
            _reg: { type },
            _startsWith: { type },
            _endsWith: { type },
            _contains: { type },
          }
        }

        return searchFields
      },
    })
  }
}
