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
                _fields._and = { type: graphql_1.GraphQLList(WhereType) };
                _fields._or = { type: graphql_1.GraphQLList(WhereType) };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1JNLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9PUk0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxxQ0FBeUU7QUFDekUsc0RBQTZCO0FBRTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFxQixHQUFHO0lBQ3RCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFpQixFQUFFLE1BQW1CO1FBQzlELE1BQU0sU0FBUyxHQUFHLElBQUksZ0NBQXNCLENBQUM7WUFDM0MsSUFBSSxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sT0FBTyxHQUFRLEVBQUUsQ0FBQTtnQkFDdkIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTt3QkFBRSxTQUFRO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUc7d0JBQ2IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztxQkFDdEQsQ0FBQTtpQkFDRjtnQkFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLHFCQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtnQkFDL0MsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7Z0JBQzlDLE9BQU8sT0FBTyxDQUFBO1lBQ2hCLENBQUM7U0FDRixDQUFDLENBQUE7UUFDRixPQUFPO1lBQ0wsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsaUJBQWlCLENBQ3RCLE1BQWlCLEVBQ2pCLEtBQWlCLEVBQ2pCLFNBQWM7UUFFZCxPQUFPLElBQUksZ0NBQXNCLENBQUM7WUFDaEMsSUFBSSxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQVUsQ0FBQTtnQkFDbEUsSUFBSSxZQUFZLEdBQVE7b0JBQ3RCLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRTtvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLHFCQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3RDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2lCQUN0QyxDQUFBO2dCQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDN0QsWUFBWSxtQ0FDUCxZQUFZLEtBQ2YsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLHFCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFDaEMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2QsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2YsQ0FBQTtpQkFDRjtnQkFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixZQUFZLG1DQUNQLFlBQVksS0FDZixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFDZCxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFDckIsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ25CLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUNwQixDQUFBO2lCQUNGO2dCQUVELE9BQU8sWUFBWSxDQUFBO1lBQ3JCLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUEvREQsc0JBK0RDIn0=