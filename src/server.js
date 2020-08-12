const express = require('express')
const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const R = require('rambda')
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')

const trace = tag => x => (console.log(tag, x), x)

const app = express()

const readJSON = file => () =>
  fs
    .readFile(path.resolve(__dirname, 'data', file), 'utf8')
    .then(data => JSON.parse(data))

const writeJSON = file => data =>
  fs.writeFile(
    path.resolve(__dirname, 'data', file),
    JSON.stringify(data, null, 2),
    {
      encoding: 'utf8',
    }
  )

const appendJSON = file => data =>
  readJSON(file)()
    .then(_file => ({
      id: _file.length + 1,
      data: { id: _file.length + 1, ...data },
      _file: _file.concat({ id: _file.length + 1, ...data }),
    }))
    .then(({ _file, data }) =>
      writeJSON(file)(_file).then(R.always(data)).then(trace('append'))
    )

const updateJSON = file => data =>
  readJSON(file)()
    .then(
      R.map(row => {
        if (data.id === row.id) return { ...data }
        return row
      })
    )
    .then(R.tap(writeJSON(file)))
    .then(R.filter(row => row.id === data.id))

const deleteJSON = file => data =>
  readJSON(file)()
    .then(R.filter(row => row.id !== data.id))
    .then(R.tap(writeJSON(file)))
    .then(R.always(data.id))

const crud = file => ({
  read: readJSON(file),
  create: appendJSON(file),
  update: updateJSON(file),
  delete: deleteJSON(file),
})

const data = {
  authors: crud('authors.json'),
  books: crud('books.json'),
}

// data.authors.create({ name: 'foontaloompasth' }).then(console.log)

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLInt) },
    author: { type: GraphQLNonNull(GraphQLInt) },
    books: {
      type: GraphQLList(BookType),
      resolve(author) {
        return data.books
          .read()
          .then(R.filter(book => book.author === author.id))
      },
    },
  }),
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    title: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve(book) {
        return data.authors
          .read()
          .then(R.find(author => author.id === book.author))
      },
    },
  }),
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root query',
    fields: () => ({
      hello: {
        type: GraphQLString,
        description: 'Sup brah!',
        resolve(parent, args) {
          return 'world'
        },
      },
      books: {
        type: GraphQLList(BookType),
        description: 'List of all books',
        resolve: data.books.read,
      },
      book: {
        type: BookType,
        description: 'Find a book',
        args: {
          id: { type: GraphQLInt },
          title: { type: GraphQLString },
        },
        resolve(parent, { title, id }) {
          return data.books
            .read()
            .then(
              R.find(
                book => book.id === id || book.title.toLowerCase().match(title)
              )
            )
        },
      },
      authors: {
        type: GraphQLList(AuthorType),
        description: 'List of all authors',
        resolve: data.authors.read,
      },
      author: {
        type: AuthorType,
        description: 'Find an author',
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
        },
        resolve(parent, { name, id }) {
          return data.authors
            .read()
            .then(
              R.find(
                author =>
                  author.id === id || author.name.toLowerCase().match(name)
              )
            )
        },
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addAuthor: {
        type: AuthorType,
        description: 'Add an Author',
        args: {
          name: { type: GraphQLString },
        },
        resolve(parent, { name }) {
          return data.authors.create({ name }).then(trace('mutation'))
        },
      },
      /*
      addBook: {
        type: BookType,
        description: 'Add an Author',
        args: {
          title: { type: GraphQLString },
        },
        resolve(parent, { title }) {
          return data.books.create({ title })
          .then(trace('mutation'))
        }
      }
      */
    }),
  }),
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
  }),
)
app.listen(4000, () => console.log('Server running on port 4000'))