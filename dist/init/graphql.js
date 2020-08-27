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
function initGraphql({ app, }) {
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
        return { app, schema };
    });
}
exports.default = initGraphql;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L2dyYXBocWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNZ0I7QUFFaEIsOERBQXFDO0FBR3JDLHFEQUE2QztBQUc3QyxTQUE4QixXQUFXLENBQUMsRUFDeEMsR0FBRyxHQUNZOztRQUNmLHFEQUFxRDtRQUVyRCxNQUFNLE1BQU0sR0FBUSxJQUFJLHVCQUFhLENBQUM7WUFDcEMsS0FBSyxFQUFFLElBQUksMkJBQWlCLENBQUM7Z0JBQzNCLElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQUUsWUFBWTtnQkFDekIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLGlCQUNaLEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsdUJBQWE7d0JBQ25CLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixPQUFPLENBQUMsQ0FBTTs0QkFDWixPQUFPLE9BQU8sQ0FBQTt3QkFDaEIsQ0FBQztxQkFDRixJQUNFLGdCQUFNLENBQUMsa0JBQWtCLEVBQUUsRUF5QzlCO2FBQ0gsQ0FBQztTQUNILENBQUMsQ0FBQTtRQUVGLGFBQWE7UUFDYixHQUFHLENBQUMsR0FBRyxDQUNMLFVBQVUsRUFDViw2QkFBVyxDQUFDO1lBQ1YsTUFBTTtZQUNOLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUNILENBQUE7UUFFRCxhQUFhO1FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FDTCxNQUFNLEVBQ04sNkJBQVcsQ0FBQztZQUNWLE1BQU07U0FDUCxDQUFDLENBQ0gsQ0FBQTtRQUVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUE7SUFDeEIsQ0FBQztDQUFBO0FBaEZELDhCQWdGQyJ9