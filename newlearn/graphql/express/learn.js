const express = require('express');
const expressGraphql = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const app = express();

const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' }
]

const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const BooksType = new GraphQLObjectType({
  name: 'books',
  description: 'description of books',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    authorId: {
      type: GraphQLInt
    },
    auth: {
      type: authorsType,
      resolve: (book)=> {
        return authors.find((item) => item.id === book.authorId)
      }
    }
  })
})

const authorsType = new GraphQLObjectType({
  name: 'auth',
  description: 'this is auth description',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    books: {
      type: new GraphQLList(BooksType),
      resolve: (auth) => {
        return books.filter((book) => book.authorId === auth.id)
      }
    }
  })
})


// 只有 type 才有 description

const rootQuery = new GraphQLObjectType({
  name: 'query',
  description: 'nihao',
  fields: () => ({
    auths: {
      type: new GraphQLList(authorsType),
      description: 'auths list',
      resolve: () => authors
    },
    book: {
      type: BooksType,
      description: 'a single book',
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parents, args) => books.find((book) => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BooksType),
      description: 'books list',
      resolve: () => books
    }
  })
})

const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'this is mutation description',
  fields: () => ({
    addBook: {
      type: BooksType,
      description: '添加book',
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parent, args) => {
        return 'hehehe'
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
})

app.use('/graphql', expressGraphql({
  schema,
  graphiql: true
}))

app.listen(5000., () => console.log('Server Running'))
