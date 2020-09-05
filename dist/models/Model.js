"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const graphql_1 = require("graphql");
exports.Cache = {
    name: new Map(),
    type: new Map(),
};
const db_1 = require("../db");
const utils_1 = require("../utils");
class Model {
    constructor(schema) {
        this.schema = schema;
        this.name = schema.name;
        this.table = schema.table;
        this.graphQLType = this.initGraphQL();
        exports.Cache.name.set(this.name, this);
    }
    initGraphQL() {
        return new graphql_1.GraphQLObjectType({
            name: this.schema.name,
            fields: () => {
                const _fields = {};
                const entries = Object.entries(this.schema.fields);
                for (const [key, value] of entries) {
                    // @ts-ignore
                    _fields[key] = this.createGraphQLField(value);
                }
                return _fields;
            },
        });
    }
    createGraphQLField(field) {
        var _a;
        const type = this.getGraphQLFieldType(field);
        const joinType = (_a = field === null || field === void 0 ? void 0 : field.join) === null || _a === void 0 ? void 0 : _a.type;
        const _field = {
            type,
        };
        // handle data oneToMany relationships
        if (joinType === 'oneToMany') {
            _field.resolve = (parent, args) => {
                // @ts-ignore
                return db_1.db[field.join.table].search({
                    [field.join.foreign]: parent[field.join.local || 'id'],
                });
            };
        }
        // handle data manyToMany relationships
        else if (joinType === 'manyToMany') {
            _field.resolve = (parent, args) => {
                // @ts-ignore
                return db_1.db[field.join.table].searchIn(utils_1.trace('searchIn')({
                    [field.join.foreign]: parent[field.join.local],
                }));
            };
        }
        // handle data manyToOne relationships
        else if (joinType === 'manyToOne') {
            _field.resolve = (parent, args) => {
                // @ts-ignore
                return db_1.db[field.join.table].findIn({
                    [field.join.foreign]: parent[field.join.local],
                });
            };
        }
        else if (joinType === 'oneToOne') {
            _field.resolve = (parent, args) => {
                // @ts-ignore
                return db_1.db[field.join.table].find({
                    [field.join.foreign]: parent[field.join.local || 'id'],
                });
            };
        }
        if (field.args) {
            _field.args = {};
            for (const [key, value] of Object.entries(field.args)) {
                _field.args[key] = {
                    // @ts-ignore
                    type: this.getGraphQLType(value),
                };
            }
        }
        return _field;
    }
    getGraphQLFieldType(field) {
        var _a;
        const joinType = (_a = field === null || field === void 0 ? void 0 : field.join) === null || _a === void 0 ? void 0 : _a.type;
        if (joinType === 'oneToMany' || joinType === 'manyToMany') {
            // recursively call getGraphQLType, but change `foreign` so we dont keep nesting
            return graphql_1.GraphQLList(this.getGraphQLType(field.type));
        }
        return this.getGraphQLType(field.type);
    }
    getGraphQLType(type) {
        // generic GraphQLType
        switch (type) {
            case 'string':
            case 'str':
                return graphql_1.GraphQLString;
            case 'integer':
            case 'int':
                return graphql_1.GraphQLInt;
            case 'boolean':
                return graphql_1.GraphQLBoolean;
            case 'id':
                return graphql_1.GraphQLInt;
        }
        // dynamic type from Model
        return this.getDynamicGraphQLType(type);
    }
    getDynamicGraphQLType(type) {
        const foreign = exports.Cache.name.get(type);
        if (!foreign) {
            throw new Error(`Cannot find Model ${type}`);
        }
        return foreign.graphQLType;
    }
    static getType(type) {
        var _a;
        return (_a = exports.Cache.name.get(type)) === null || _a === void 0 ? void 0 : _a.graphQLType;
    }
    static entries(type) {
        return exports.Cache.name.entries();
    }
    initElasticSearch() { }
}
exports.default = Model;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQVVnQjtBQU9ILFFBQUEsS0FBSyxHQUFHO0lBQ25CLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtDQUNoQixDQUFBO0FBK0RELDhCQUFrQztBQUNsQyxvQ0FBZ0M7QUFHaEMsTUFBcUIsS0FBSztJQU94QixZQUFZLE1BQWlCO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFFckMsYUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSwyQkFBaUIsQ0FBQztZQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3RCLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsTUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQTtnQkFDMUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNsRCxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksT0FBTyxFQUFFO29CQUNsQyxhQUFhO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQzlDO2dCQUNE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