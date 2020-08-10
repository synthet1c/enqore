import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {crud, db, Record, Author, Book, File} from './db'
import testRoute from './modules/books/book/index'
import _glob from 'glob'
import util from 'util'

const glob = util.promisify(_glob)
import Model from './models/Model'
import {promises as fs} from "fs";
import path from "path";
import {trace} from "./utils";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'


const app = express()

const readJSON = (filePath: string): Promise<JSON> =>
  fs.readFile(path.resolve(process.cwd(), './src', filePath), 'utf-8')
    .then(content => JSON.parse(content))

glob('**/*/model.json', {
  cwd: path.join(process.cwd(), './src')
})
  .then(trace('glob'))
  .then(globs => Promise.all(globs.map(readJSON)))
  .then((models: any[]): any[] => {
    return models.map(model => new Model(model))
  })
  .then((schemas: any[]) => {

    const schema: GraphQLSchema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'Root query',
        fields: () => ({
          hello: {
            type: GraphQLString,
            description: 'Sup brah!',
            resolve(_: any, args) {
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

    app.use('/test', testRoute)

    app.listen(4000, () => {
      // tslint:disable-next-line:no-console
      console.log('Server running on port 4000 bitch')
    });

  })
