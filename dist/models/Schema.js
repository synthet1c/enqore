"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
const RootQuery_1 = __importDefault(require("./RootQuery"));
const graphql_1 = require("graphql");
const _cache = new Map();
class Schema {
    constructor(json) {
        this.schema = json;
        this.name = json.name;
        this.model = new Model_1.default(json);
        this.rootQuery = new RootQuery_1.default(json);
        Schema.cache.set(this.name, this);
    }
    getModel() {
        return this.model;
    }
    getRootQuery() {
        return this.rootQuery;
    }
    getSchema() {
        return this.schema;
    }
    getEntries() {
        return Schema.cache.entries();
    }
    static getSchema(name) {
        return Schema.cache.get(name);
    }
    static getModel(name) {
        if (Schema.cache.has(name))
            return Schema.cache.get(name).model;
        return null;
    }
    static getRootQuery(name) {
        if (Schema.cache.has(name))
            return Schema.cache.get(name).rootQuery;
        return null;
    }
    static getRootQueryObject() {
        return Array.from(Schema.cache.entries()).reduce((acc, [name, schema]) => (Object.assign(Object.assign({}, acc), schema.getRootQuery().getRootQueries())), {});
    }
    static createSearchInputs(fields) {
        const _fields = {};
        for (const [name, field] of Object.entries(fields)) {
            const type = Schema.getGraphQLScalarType(field.type);
            _fields[name] = new graphql_1.GraphQLInputObjectType({
                name: 'innerWhere',
                fields: () => {
                    return {
                        _eq: { type },
                    };
                },
            });
        }
        return new graphql_1.GraphQLInputObjectType({
            name: 'where',
            fields: () => _fields,
        });
    }
    static createSearchDirectives(name, field) {
        const type = Schema.getGraphQLScalarType(field.type);
        const SearchFieldType = new graphql_1.GraphQLInputObjectType({
            name: `where_${name}_${field.name}`,
            description: 'filter your results',
            fields: () => searchFields,
        });
        let searchFields = {
            _eq: { type },
            _neq: { type },
            _and: { type: graphql_1.GraphQLList(SearchFieldType) },
            _or: { type: graphql_1.GraphQLList(SearchFieldType) },
        };
        if (field.type === 'int') {
            searchFields = Object.assign(Object.assign({}, searchFields), { _in: { type: graphql_1.GraphQLList(type) }, _gt: { type }, _lt: { type } });
        }
        if (field.type === 'string') {
            searchFields = Object.assign(Object.assign({}, searchFields), { _reg: { type } });
        }
    }
    static getGraphQLScalarType(type) {
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
    }
}
exports.default = Schema;
Schema.cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBbUU7QUFDbkUsNERBQW1DO0FBQ25DLHFDQU9nQjtBQUVoQixNQUFNLE1BQU0sR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUU3QyxNQUFxQixNQUFNO0lBU3pCLFlBQVksSUFBZTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDM0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFZO1FBQzFCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxD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