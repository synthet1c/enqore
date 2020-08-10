"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const express_graphql_1 = require("express-graphql");
const rambda_1 = __importDefault(require("rambda"));
const graphql_1 = require("graphql");
const trace = (tag) => (x) => {
    // tslint:disable-next-line:no-console
    console.log(tag, x);
    return x;
};
const app = express_1.default();
const readJSON = (file) => () => fs_1.promises.readFile(path_1.default.resolve(__dirname, '../data', file), 'utf8')
    .then((data) => JSON.parse(data));
const writeJSON = (file) => (data) => fs_1.promises.writeFile(path_1.default.resolve(__dirname, '../data', file), JSON.stringify(data, null, 2), {
    encoding: 'utf8'
});
const appendJSON = (file) => (data) => readJSON(file)()
    .then((_file) => ({
    id: _file.length + 1,
    _data: Object.assign({ id: _file.length + 1 }, data),
    _file: _file.concat(Object.assign({ id: _file.length + 1 }, data))
}))
    .then(({ _file, _data }) => writeJSON(file)(_file)
    .then(rambda_1.default.always(_data))
    .then(trace('append')));
const updateJSON = (file) => (data) => readJSON(file)()
    .then(rambda_1.default.map((row) => {
    if (data.id === row.id)
        return Object.assign({}, data);
    return row;
}))
    .then(rambda_1.default.tap(writeJSON(file)))
    .then(rambda_1.default.filter((row) => row.id === data.id));
const deleteJSON = (file) => (data) => readJSON(file)()
    .then(rambda_1.default.filter((row) => row.id !== data.id))
    .then(rambda_1.default.tap(writeJSON(file)))
    .then(rambda_1.default.always(data.id));
const crud = (file) => ({
    read: readJSON(file),
    create: appendJSON(file),
    update: updateJSON(file),
    delete: deleteJSON(file),
});
const db = {
    authors: crud('authors.json'),
    books: crud('books.json'),
};
const AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        author: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        books: {
            type: graphql_1.GraphQLList(BookType),
            resolve(author) {
                return db.books.read()
                    .then(rambda_1.default.filter((book) => book.author === author.id));
            }
        }
    })
});
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        title: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        author: {
            type: AuthorType,
            resolve(book) {
                return db.authors.read()
                    .then(rambda_1.default.find((author) => author.id === book.author));
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
                resolve: db.books.read
            },
            book: {
                type: BookType,
                description: 'Find a book',
                args: {
                    id: { type: graphql_1.GraphQLInt },
                    title: { type: graphql_1.GraphQLString }
                },
                resolve(_, { title, id }) {
                    return db.books.read()
                        .then((books) => books.find((book) => book.id === id || book.title.toLowerCase().match(title)));
                }
            },
            authors: {
                type: graphql_1.GraphQLList(AuthorType),
                description: 'List of all authors',
                resolve: db.authors.read
            },
            author: {
                type: AuthorType,
                description: 'Find an author',
                args: {
                    id: { type: graphql_1.GraphQLInt },
                    name: { type: graphql_1.GraphQLString }
                },
                resolve(parent, { name, id }) {
                    return db.authors.read()
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
                    return db.authors.create({ name })
                        .then(trace('mutation'));
                }
            },
            addBook: {
                type: BookType,
                description: 'Add an Book',
                args: {
                    title: { type: graphql_1.GraphQLString },
                },
                resolve(parent, { title }) {
                    return db.books.create({ title })
                        .then(trace('mutation'));
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
app.listen(4000, () => {
    // tslint:disable-next-line:no-console
    console.log('Server running on port 4000');
});
//# sourceMappingURL=index.ts.map