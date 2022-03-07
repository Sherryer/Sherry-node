'use strict';

const account = require('./account'); // 公众号
const task = require('./task'); // 任务宝
const refuel = require('./refuel'); // 任务宝

const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');


// 只有 type 才有 description

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'root query',
  fields: () => ({
    ...account.queryFields,
    ...task.queryFields,
    ...refuel.queryFields,
  }),
});

const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'root mutation',
  fields: () => ({
    ...account.mutationFields,
    ...task.mutationFields,
    ...refuel.mutationFields,
  }),
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

module.exports = schema;
