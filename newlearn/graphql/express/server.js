const express = require('express');
const expressGraphql = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const app = express()

// data
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

const query = new GraphQLObjectType({
  name: 'getHelloWord',
  description: 'this is hello word',
  fields: () => ({
    message2: {
      description: 'this is message',
      type: GraphQLString,
      resolve: () => 'Hello Word'
    }
  })
})

const schema = new GraphQLSchema({
  query
})

app.use('/graphql', expressGraphql({
  schema,
  graphiql: true,
}))
app.listen(5000., () => console.log('Server Running'))