"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Schema_1 = __importDefault(require("./Schema"));
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
class ORM {
    static createSearchFields(schema, fields) {
        const WhereType = new graphql_1.GraphQLInputObjectType({
            name: `where_${schema.name}`,
            fields: () => {
                const _fields = {};
                for (const [key, field] of Object.entries(fields)) {
                    if (!field.filterable)
                        continue;
                    _fields[key] = {
                        type: ORM.createSearchField(schema, field, WhereType),
                    };
                }
                _fields['_and'] = { type: graphql_1.GraphQLList(WhereType) };
                _fields['_or'] = { type: graphql_1.GraphQLList(WhereType) };
                return _fields;
            },
        });
        return {
            type: WhereType,
        };
    }
    static createSearchField(schema, field, WhereType) {
        return new graphql_1.GraphQLInputObjectType({
            name: `where_${schema.name}_${field.name}`,
            fields: () => {
                const type = Schema_1.default.getGraphQLScalarType(field.type) || graphql_1.GraphQLInt;
                let searchFields = {
                    _eq: { type },
                    _neq: { type },
                    _and: { type: graphql_1.GraphQLList(WhereType) },
                    _or: { type: graphql_1.GraphQLList(WhereType) },
                };
                if (field.type === 'id' || field.type === 'int' || field.join) {
                    searchFields = Object.assign(Object.assign({}, searchFields), { _in: { type: graphql_1.GraphQLList(type) }, _gt: { type }, _gte: { type }, _lt: { type }, _lte: { type } });
                }
                if (field.type === 'string') {
                    searchFields = Object.assign(Object.assign({}, searchFields), { _reg: { type }, _startsWith: { type }, _endsWith: { type }, _contains: { type } });
                }
                return searchFields;
            },
        });
    }
}
exports.default = ORM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1JNLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9PUk0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxxQ0FBeUU7QUFDekUsc0RBQTZCO0FBRTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFxQixHQUFHO0lBQ3RCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFpQixFQUFFLE1BQW1CO1FBQzlELE1BQU0sU0FBUyxHQUFHLElBQUksZ0NBQXNCLENBQUM7WUFDM0MsSUFBSSxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sT0FBTyxHQUFRLEVBQUUsQ0FBQTtnQkFDdkIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTt3QkFBRSxTQUFRO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUc7d0JBQ2IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztxQkFDdEQsQ0FBQTtpQkFDRjtnQkFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUscUJBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO2dCQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUscUJBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO2dCQUNqRCxPQUFPLE9BQU8sQ0FBQTtZQUNoQixDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsT0FBTztZQUNMLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUN0QixNQUFpQixFQUNqQixLQUFpQixFQUNqQixTQUFjO1FBRWQsT0FBTyxJQUFJLGdDQUFzQixDQUFDO1lBQ2hDLElBQUksRUFBRSxTQUFTLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUMxQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFVLENBQUE7Z0JBQ2xFLElBQUksWUFBWSxHQUFRO29CQUN0QixHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFO29CQUNkLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUN0QyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUscUJBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRTtpQkFDdEMsQ0FBQTtnQkFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQzdELFlBQVksbUNBQ1AsWUFBWSxLQUNmLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ2hDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUNkLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxHQUNmLENBQUE7aUJBQ0Y7Z0JBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsWUFBWSxtQ0FDUCxZQUFZLEtBQ2YsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2QsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ3JCLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUNuQixTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDcEIsQ0FBQTtpQkFDRjtnQkFFRCxPQUFPLFlBQVksQ0FBQTtZQUNyQixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBL0RELHNCQStEQyJ9