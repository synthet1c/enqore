import express from 'express'
import fsSync, { promises as fs } from 'fs'
import path from 'path'
import { graphqlHTTP } from 'express-graphql'
import R from 'rambda'
import { crud, db, Record, Author, Book, File } from './db'
import { trace } from './utils/trace'
import testRoute from './modules/books/book/index'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'



const app = express()


const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLInt) },
    author: { type: GraphQLNonNull(GraphQLInt) },
    books: {
      type: GraphQLList(BookType),
      resolve(author: Author) {
        return db.books.read()
        .then((books: Book[]) => books.filter((book: Book) => book.author === author.id))
      }
    }
  })
})


const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    title: { type: GraphQLString },
    publisher: { type: GraphQLString },
    description: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLInt) },
    pages: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(book: Book) {
        return db.authors.read()
        .then((authors: Author[]) =>
          authors.find((author: Author) => author.id === book.author)
        )
      }
    }
  })
})


const schema = new GraphQLSchema({
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
        type: GraphQLList(BookType),
        description: 'List of all books',
        resolve: db.books.read
      },
      book: {
        type: BookType,
        description: 'Find a book',
        args: {
          id: { type: GraphQLInt },
          title: { type: GraphQLString }
        },
        resolve(_: any, { title, id }: Book) {
          return db.books.read()
            .then((books: Book[]) =>
              books.find((book: Book) => book.id === id || book.title.toLowerCase().match(title))
            )
        }
      },
      authors: {
        type: GraphQLList(AuthorType),
        description: 'List of all authors',
        resolve: db.authors.read
      },
      author: {
        type: AuthorType,
        description: 'Find an author',
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString }
        },
        resolve(parent, { name, id }: Author) {
          return db.authors.read()
          .then((authors: Author[]) =>
            authors.find(author => author.id === id || author.name.toLowerCase().match(name))
          )
        }
      },
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    description: 'Root Mutation',
    fields: () => ({
      addAuthor: {
        type: AuthorType,
        description: 'Add an Author',
        args: {
          name: { type: GraphQLString },
        },
        resolve(parent, { name }: any) {
          return db.authors.create({ name })
            .then(trace('mutation'))
        }
      },
      addBook: {
        type: BookType,
        description: 'Add an Book',
        args: {
          title: { type: GraphQLString },
        },
        resolve(parent, { title }: any) {
          return db.books.create({ title })
          .then(trace('mutation'))
        }
      }
    })
  })
})


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.use(
  '/api',
  graphqlHTTP({
    schema,
  })
)

app.use('/test', testRoute)

app.listen(4000, () => {
  // tslint:disable-next-line:no-console
  console.log('Server running on port 4000 bitch')
});