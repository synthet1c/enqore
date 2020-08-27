"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
const db_1 = require("../db");
const graphql_1 = require("graphql");
// @ts-ignore
const pluralize_1 = __importStar(require("pluralize"));
// @ts-ignore
const capitalize_1 = __importDefault(require("capitalize"));
const Schema_1 = __importDefault(require("./Schema"));
const ORM_1 = __importDefault(require("./ORM"));
const _cache = new Map();
class RootQuery {
    constructor(schema) {
        this.findable = [];
        this.searchable = [];
        this.filterable = [];
        this.mutationFields = [];
        this.getters = {};
        this.mutations = {};
        this.schema = schema;
        this.name = schema.name;
        this.table = schema.table;
        this.parseFieldDirectives(schema.fields);
        this.generateRootQueries();
        this.generateRootMutations(schema.fields);
    }
    parseFieldDirectives(fields) {
        for (let [key, modelField] of Object.entries(fields)) {
            if (modelField === null || modelField === void 0 ? void 0 : modelField.findable) {
                this.findable.push(key);
            }
            if (modelField === null || modelField === void 0 ? void 0 : modelField.searchable) {
                this.searchable.push(key);
            }
            if (modelField === null || modelField === void 0 ? void 0 : modelField.filterable) {
                this.filterable.push(key);
            }
            if ((modelField === null || modelField === void 0 ? void 0 : modelField.field) === 'field') {
                this.mutationFields.push(key);
            }
        }
    }
    getRootQueries() {
        return this.getters;
    }
    generateRootQueries() {
        const args = {};
        const whereTypes = {};
        this.findable.forEach(key => {
            var _a;
            const field = this.schema.fields[key];
            const type = Schema_1.default.getGraphQLScalarType(field.type);
            if (!field.join) {
                args[key] = {
                    type,
                    description: `Get by ${key}`,
                };
            }
            else if (((_a = field === null || field === void 0 ? void 0 : field.join) === null || _a === void 0 ? void 0 : _a.type) === 'manyToMany') {
                args[key] = {
                    type: graphql_1.GraphQLList(graphql_1.GraphQLInt),
                    description: `Get by ${key}`,
                };
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
        });
        const pagination = {
            perPage: { type: graphql_1.GraphQLInt },
            start: { type: graphql_1.GraphQLInt },
            order: { type: graphql_1.GraphQLString },
            sort: { type: graphql_1.GraphQLString },
        };
        const detail = {
            type: Model_1.default.getType(this.schema.name),
            description: this.schema.description,
            args,
            resolve: (parent, args) => {
                // @ts-ignore
                return db_1.db[this.schema.table].find(args);
            },
        };
        const list = {
            type: graphql_1.GraphQLList(Model_1.default.getType(this.schema.name)),
            description: this.schema.description,
            args: Object.assign(Object.assign(Object.assign({}, pagination), args), { where: ORM_1.default.createSearchFields(this.schema, this.schema.fields) }),
            resolve: (parent, args) => {
                console.log('~', JSON.stringify(args, null, 2));
                if (args.where) {
                    // @ts-ignore
                    return db_1.db[this.schema.table].where(args);
                }
                // @ts-ignore
                return db_1.db[this.schema.table].search(args);
            },
        };
        this.getters[pluralize_1.singular(this.schema.table)] = detail;
        this.getters[pluralize_1.default(this.schema.table)] = list;
    }
    getRootMutations() {
        return this.mutations;
    }
    generateRootMutations(fields) {
        const args = {};
        const fieldName = capitalize_1.default(pluralize_1.singular(this.schema.table));
        const schemaName = pluralize_1.singular(this.schema.name);
        for (let [key, modelField] of Object.entries(fields)) {
            if ((modelField === null || modelField === void 0 ? void 0 : modelField.field) === 'field') {
                args[key] = {
                    type: (modelField === null || modelField === void 0 ? void 0 : modelField.required) ? graphql_1.GraphQLNonNull(Schema_1.default.getGraphQLScalarType(modelField.type))
                        : Schema_1.default.getGraphQLScalarType(modelField.type),
                };
            }
        }
        this.mutations[`insert${fieldName}`] = {
            type: Model_1.default.getType(this.schema.name),
            description: `Create a ${schemaName}`,
            args,
            resolve: (parent, args) => {
                // @ts-ignore
                return db_1.db[this.schema.table].create(args);
            },
        };
        this.mutations[`update${fieldName}`] = {
            type: Model_1.default.getType(this.schema.name),
            description: `Update a ${schemaName}`,
            args,
            resolve: (parent, args) => {
                // @ts-ignore
                return db_1.db[this.schema.table].update(args);
            },
        };
        this.mutations[`upsert${fieldName}`] = {
            type: Model_1.default.getType(this.schema.name),
            description: `Update or insert a ${schemaName}`,
            args,
            resolve: (parent, args) => {
                // @ts-ignore
                return db_1.db[this.schema.table].create(args);
            },
        };
    }
}
exports.default = RootQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vdFF1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Sb290UXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTJFO0FBQzNFLDhCQUFrQztBQUNsQyxxQ0FNZ0I7QUFDaEIsYUFBYTtBQUNiLHVEQUErQztBQUMvQyxhQUFhO0FBQ2IsNERBQW1DO0FBQ25DLHNEQUE2QjtBQUM3QixnREFBdUI7QUFFdkIsTUFBTSxNQUFNLEdBQTJCLElBQUksR0FBRyxFQUFFLENBQUE7QUFFaEQsTUFBcUIsU0FBUztJQVc1QixZQUFZLE1BQWlCO1FBUHJCLGFBQVEsR0FBYSxFQUFFLENBQUE7UUFDdkIsZUFBVSxHQUFhLEVBQUUsQ0FBQTtRQUN6QixlQUFVLEdBQWEsRUFBRSxDQUFBO1FBQ3pCLG1CQUFjLEdBQVUsRUFBRSxDQUFBO1FBQzFCLFlBQU8sR0FBUSxFQUFFLENBQUE7UUFDakIsY0FBUyxHQUFRLEVBQUUsQ0FBQTtRQUd6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBRXpCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsb0JBQW9CLENBQUMsTUFBbUI7UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsUUFBUSxFQUFFO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN4QjtZQUNELElBQUksVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFVBQVUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDMUI7WUFDRCxJQUFJLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxVQUFVLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO1lBQ0QsSUFBSSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxLQUFLLE1BQUssT0FBTyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUM5QjtTQUNGO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixNQUFNLElBQUksR0FBUSxFQUFFLENBQUE7UUFDcEIsTUFBTSxVQUFVLEdBQVEsRUFBRSxDQUFBO1FBRTFCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNyQyxNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7b0JBQ1YsSUFBSTtvQkFDSixXQUFXLEVBQUUsVUFBVSxHQUFHLEVBQUU7aUJBQzdCLENBQUE7YUFDRjtpQkFBTSxJQUFJLE9BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksMENBQUUsSUFBSSxNQUFLLFlBQVksRUFBRTtnQkFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHO29CQUNWLElBQUksRUFBRSxxQkFBVyxDQUFDLG9CQUFVLENBQUM7b0JBQzdCLFdBQVcsRUFBRSxVQUFVLEdBQUcsRUFBRTtpQkFDN0IsQ0FBQTthQUNGO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBNkJFO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLFVBQVUsR0FBUTtZQUN0QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRTtZQUM3QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRTtZQUMzQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTtZQUM5QixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTtTQUM5QixDQUFBO1FBRUQsTUFBTSxNQUFNLEdBQVE7WUFDbEIsSUFBSSxFQUFFLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztZQUNwQyxJQUFJO1lBQ0osT0FBTyxFQUFFLENBQUMsTUFBYyxFQUFFLElBQWlCLEVBQUUsRUFBRTtnQkFDN0MsYUFBYTtnQkFDYixPQUFPLE9BQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN6QyxDQUFDO1NBQ0YsQ0FBQTtRQUVELE1BQU0sSUFBSSxHQUFRO1lBQ2hCLElBQUksRUFBRSxxQkFBVyxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1lBQ3BDLElBQUksZ0RBQ0MsVUFBVSxHQUNWLElBQUksS0FDUCxLQUFLLEVBQUUsYUFBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FDL0Q7WUFDRCxPQUFPLEVBQUUsQ0FBQyxNQUFjLEVBQUUsSUFBaUIsRUFBRSxFQUFFO2dCQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNkLGFBQWE7b0JBQ2IsT0FBTyxPQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ3pDO2dCQUNELGFBQWE7Z0JBQ2IsT0FBTyxPQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDM0MsQ0FBQztTQUNGLENBQUE7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtRQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUNuRCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQ3ZCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxNQUFtQjtRQUMvQyxNQUFNLElBQUksR0FBUSxFQUFFLENBQUE7UUFDcEIsTUFBTSxTQUFTLEdBQUcsb0JBQVUsQ0FBQyxvQkFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUN6RCxNQUFNLFVBQVUsR0FBRyxvQkFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxLQUFLLE1BQUssT0FBTyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7b0JBQ1YsSUFBSSxFQUFFLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFFBQVEsRUFDeEIsQ0FBQyxDQUFDLHdCQUFjLENBQUMsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzlELENBQUMsQ0FBQyxnQkFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7aUJBQ2pELENBQUE7YUFDRjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLFNBQVMsRUFBRSxDQUFDLEdBQUc7WUFDckMsSUFBSSxFQUFFLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckMsV0FBVyxFQUFFLFlBQVksVUFBVSxFQUFFO1lBQ3JDLElBQUk7WUFDSixPQUFPLEVBQUUsQ0FBQyxNQUFjLEVBQUUsSUFBaUIsRUFBRSxFQUFFO2dCQUM3QyxhQUFhO2dCQUNiLE9BQU8sT0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNDLENBQUM7U0FDRixDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLFNBQVMsRUFBRSxDQUFDLEdBQUc7WUFDckMsSUFBSSxFQUFFLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckMsV0FBVyxFQUFFLFlBQVksVUFBVSxFQUFFO1lBQ3JDLElBQUk7WUFDSixPQUFPLEVBQUUsQ0FBQyxNQUFjLEVBQUUsSUFBaUIsRUFBRSxFQUFFO2dCQUM3QyxhQUFhO2dCQUNiLE9BQU8sT0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNDLENBQUM7U0FDRixDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLFNBQVMsRUFBRSxDQUFDLEdBQUc7WUFDckMsSUFBSSxFQUFFLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckMsV0FBVyxFQUFFLHNCQUFzQixVQUFVLEVBQUU7WUFDL0MsSUFBSTtZQUVKLE9BQU8sRUFBRSxDQUFDLE1BQWMsRUFBRSxJQUFpQixFQUFFLEVBQUU7Z0JBQzdDLGFBQWE7Z0JBQ2IsT0FBTyxPQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDM0MsQ0FBQztTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF2TEQsNEJBdUxDIn0=