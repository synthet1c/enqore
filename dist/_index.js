"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const db_1 = require("./db");
const trace_1 = require("./utils/trace");
const index_1 = __importDefault(require("./modules/books/book/index"));
const graphql_1 = require("graphql");
const app = express_1.default();
const AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        author: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        books: {
            type: graphql_1.GraphQLList(BookType),
            resolve(author) {
                return db_1.db.books.read()
                    .then((books) => books.filter((book) => book.author === author.id));
            }
        }
    })
});
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        title: { type: graphql_1.GraphQLString },
        publisher: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        pages: { type: graphql_1.GraphQLInt },
        author: {
            type: AuthorType,
            resolve(book) {
                return db_1.db.authors.read()
                    .then((authors) => authors.find((author) => author.id === book.author));
            }
        }
    })
});
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'RootQueryType',
        description: 'Root query',
        fields: () => ({
            hello: {
                type: graphql_1.GraphQLString,
                description: 'Sup brah!',
                resolve(_, args) {
                    return 'world';
                }
            },
            books: {
                type: graphql_1.GraphQLList(BookType),
                description: 'List of all books',
                resolve: db_1.db.books.read
            },
            book: {
                type: BookType,
                description: 'Find a book',
                args: {
                    id: { type: graphql_1.GraphQLInt },
                    title: { type: graphql_1.GraphQLString }
                },
                resolve(_, { title, id }) {
                    return db_1.db.books.read()
                        .then((books) => books.find((book) => book.id === id || book.title.toLowerCase().match(title)));
                }
            },
            authors: {
                type: graphql_1.GraphQLList(AuthorType),
                description: 'List of all authors',
                resolve: db_1.db.authors.read
            },
            author: {
                type: AuthorType,
                description: 'Find an author',
                args: {
                    id: { type: graphql_1.GraphQLInt },
                    name: { type: graphql_1.GraphQLString }
                },
                resolve(parent, { name, id }) {
                    return db_1.db.authors.read()
                        .then((authors) => authors.find(author => author.id === id || author.name.toLowerCase().match(name)));
                }
            },
        })
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: "Mutation",
        description: 'Root Mutation',
        fields: () => ({
            addAuthor: {
                type: AuthorType,
                description: 'Add an Author',
                args: {
                    name: { type: graphql_1.GraphQLString },
                },
                resolve(parent, { name }) {
                    return db_1.db.authors.create({ name })
                        .then(trace_1.trace('mutation'));
                }
            },
            addBook: {
                type: BookType,
                description: 'Add an Book',
                args: {
                    title: { type: graphql_1.GraphQLString },
                },
                resolve(parent, { title }) {
                    return db_1.db.books.create({ title })
                        .then(trace_1.trace('mutation'));
                }
            }
        })
    })
});
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema,
    graphiql: true
}));
app.use('/api', express_graphql_1.graphqlHTTP({
    schema,
}));
app.use('/test', index_1.default);
app.listen(4000, () => {
    // tslint:disable-next-line:no-console
    console.log('Server running on port 4000 bitch');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL19pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE2QjtBQUc3QixxREFBNkM7QUFFN0MsNkJBQTJEO0FBQzNELHlDQUFxQztBQUNyQyx1RUFBa0Q7QUFFbEQscUNBT2dCO0FBSWhCLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQTtBQUdyQixNQUFNLFVBQVUsR0FBc0IsSUFBSSwyQkFBaUIsQ0FBQztJQUMxRCxJQUFJLEVBQUUsUUFBUTtJQUNkLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUU7UUFDN0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUFjLENBQUMsb0JBQVUsQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBYyxDQUFDLG9CQUFVLENBQUMsRUFBRTtRQUM1QyxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUscUJBQVcsQ0FBQyxRQUFRLENBQUM7WUFDM0IsT0FBTyxDQUFDLE1BQWM7Z0JBQ3BCLE9BQU8sT0FBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7cUJBQ3JCLElBQUksQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNuRixDQUFDO1NBQ0Y7S0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFBO0FBR0YsTUFBTSxRQUFRLEdBQXNCLElBQUksMkJBQWlCLENBQUM7SUFDeEQsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNiLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSx1QkFBYSxFQUFF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