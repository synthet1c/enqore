"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Schema_1 = __importDefault(require("../models/Schema"));
const express_graphql_1 = require("express-graphql");
function initGraphql({ app, Db, mongoClient, }) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('schema', Schema.getRootQueryObject())
        const schema = new graphql_1.GraphQLSchema({
            query: new graphql_1.GraphQLObjectType({
                name: 'RootQueryType',
                description: 'Root query',
                fields: () => (Object.assign({ hello: {
                        type: graphql_1.GraphQLString,
                        description: 'Sup brah!',
                        resolve(_) {
                            return 'world';
                        },
                    } }, Schema_1.default.getRootQueryObject())),
            }),
        });
        // @ts-ignore
        app.use('/graphql', express_graphql_1.graphqlHTTP({
            schema,
            graphiql: true,
        }));
        // @ts-ignore
        app.use('/api', express_graphql_1.graphqlHTTP({
            schema,
        }));
        return { app, schema, Db, mongoClient };
    });
}
exports.default = initGraphql;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L2dyYXBocWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNZ0I7QUFFaEIsOERBQXFDO0FBR3JDLHFEQUE2QztBQUc3QyxTQUE4QixXQUFXLENBQUMsRUFDeEMsR0FBRyxFQUNILEVBQUUsRUFDRixXQUFXLEdBQ0k7O1FBQ2YscURBQXFEO1FBRXJELE1BQU0sTUFBTSxHQUFRLElBQUksdUJBQWEsQ0FBQztZQUNwQyxLQUFLLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsaUJBQ1osS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSx1QkFBYTt3QkFDbkIsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLE9BQU8sQ0FBQyxDQUFNOzRCQUNaLE9BQU8sT0FBTyxDQUFBO3dCQUNoQixDQUFDO3FCQUNGLElBQ0UsZ0JBQU0sQ0FBQyxrQkFBa0IsRUFBRSxFQXlDOUI7YUFDSCxDQUFDO1NBQ0gsQ0FBQyxDQUFBO1FBRUYsYUFBYTtRQUNiLEdBQUcsQ0FBQyxHQUFHLENBQ0wsVUFBVSxFQUNWLDZCQUFXLENBQUM7WUFDVixNQUFNO1lBQ04sUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQ0gsQ0FBQTtRQUVELGFBQWE7UUFDYixHQUFHLENBQUMsR0FBRyxDQUNMLE1BQU0sRUFDTiw2QkFBVyxDQUFDO1lBQ1YsTUFBTTtTQUNQLENBQUMsQ0FDSCxDQUFBO1FBRUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFBO0lBQ3pDLENBQUM7Q0FBQTtBQWxGRCw4QkFrRkMifQ==