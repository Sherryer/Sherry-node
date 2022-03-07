const Koa = require("koa");
const mount = require("koa-mount");
const session = require('koa-session');
const graphqlHTTP = require("koa-graphql");
const router = require('koa-router')()

const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')


const app = new Koa();


// ====


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

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.keys = ['test-secret'];
app.use(session(CONFIG, app));
app.use(async (ctx, next) =>  {
  const url = ctx.request && ctx.request.url
  const ctxsession = ctx.session
  console.log('url:', url)
  if (!ctx.session.username) {
    console.log('设置session')
    ctx.session.username = "张三";
  } else {
    console.log('读取session', ctx.session.username)
  }
  console.log('query:', ctx.query)
  // console.log('session:', ctxsession)
  await next();
});


app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  )
);

router.get('/a', function (ctx, next) {
  ctx.body = 'aaa'
})

app.use(router.routes(), router.allowedMethods())

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(3000);
console.log("server started at http://localhost:3000");
