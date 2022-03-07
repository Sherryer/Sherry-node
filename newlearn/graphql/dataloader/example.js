const express = require('express')
const expressGraphQL = require('express-graphql')
const Dataloader = require('dataloader')
const ramda = require('ramda')
const { groupBy } = ramda

const app = express()
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

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

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    isTypeOf: (value, info) => {
        console.log('value====', value)
        console.log('info====', info)
        return true
    },
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book, args, ctx, info) => {
                console.log('info2===:', info)
                let { loaders } = ctx
                let { AuthorLoader } = loaders
                return AuthorLoader.load(book.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args, ctx) => {
                return books.find(book => book.id === args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => authors
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
})

const AuthorLoader = () => new Dataloader(authorCb)

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
    context: {
        loaders: {
            AuthorLoader: AuthorLoader()
        }
    }
}))
app.listen(5000, () => console.log('http://localhost:5000/graphql'))


function authorCb (authorIds) {
    // authorIds: [ 1, 2, 3 ]
    console.log('authorIds:', authorIds)

    // 根据 ids 查找：满足作者 id 被 authorIds 包含的作者数据。 返回数组。
    var authorList = authors.filter(item => authorIds.includes(item.id))

    // 通过 groupBy 整理作者数据为对象
    /*  groupById
        {
            '1': [ { id: 1, name: 'J. K. Rowling' } ],
            '2': [ { id: 2, name: 'J. R. R. Tolkien' } ],
            '3': [ { id: 3, name: 'Brent Weeks' } ]
        }
     */
    var groupById = groupBy(item => item.id ,authorList)

    // 整理数据，让 authorList 按照 authorIds 中的 id 排序
    /*
        [ { id: 1, name: 'J. K. Rowling' },
        { id: 2, name: 'J. R. R. Tolkien' },
        { id: 3, name: 'Brent Weeks' } ]
     */
    authorList = authorIds.map(item => groupById[item][0])

    return Promise.resolve(authorList)
}
