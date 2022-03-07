const Koa = require("koa");
const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const schema = require('./graphql/schema');

const app = new Koa();

app.use(
  mount(
    "/api/admin/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  )
);

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(3000);
console.log("server started at http://localhost:3000");
