import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import Model from "../models/Model";
import {Author, Book, db} from "../db";
import { Server } from "express";
import {graphqlHTTP} from "express-graphql";

export default async function initializeGraphql(app: Server) {
    const schema: any = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'Root query',
        fields: () => ({
          hello: {
            type: GraphQLString,
            description: 'Sup brah!',
            resolve(_: any) {
              return 'world'
            }
          },
          books: {
            type: GraphQLList(Model.getType('Book')),
            description: 'List of all books',
            resolve: db.books.read
          },
          book: {
            type: Model.getType('Book'),
            description: 'Find a book',
            args: {
              id: {type: GraphQLInt},
              title: {type: GraphQLString}
            },
            resolve(_: any, {title, id}: Book) {
              return db.books.read()
                .then((books: Book[]) =>
                  books.find((book: Book) => book.id === id || book.title.toLowerCase().match(title))
                )
            }
          },
          authors: {
            type: GraphQLList(Model.getType('Author')),
            description: 'List of all authors',
            resolve: db.authors.read
          },
          author: {
            type: Model.getType('Author'),
            description: 'Find an author',
            args: {
              id: {type: GraphQLInt},
              name: {type: GraphQLString}
            },
            resolve(parent, {name, id}: Author) {
              return db.authors.read()
                .then((authors: Author[]) =>
                  authors.find(author => author.id === id || author.name.toLowerCase().match(name))
                )
            }
          },
        })
      })
    })

    // @ts-ignore
    app.use('/graphql',
      graphqlHTTP({
        schema,
        graphiql: true
      })
    )

    app.use('/api',
      graphqlHTTP({
        schema,
      })
    )

  return app
}