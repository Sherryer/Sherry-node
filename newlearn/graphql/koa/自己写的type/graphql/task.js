'use strict';
// 任务宝
const Types = require('./types');

const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const taskPageationType = new GraphQLObjectType({
  name: 'taskPageationType',
  description: 'task pageation list',
  fields: () => ({
    list: {
      type: new GraphQLList(Types.TaskType),
    },
    pageation: {
      type: Types.PageationType,
    },
  }),
});

const queryFields = {
  task_list: {
    type: taskPageationType,
    description: 'task pageation list',
    args: {
      current: { type: GraphQLInt },
      pageSize: { type: GraphQLInt },
    },
    resolve: (parent, args, ctx) => ctx.proxy.activity.findList({
      current: args.current,
      pageSize: args.pageSize,
    }),
  },
  task_item: {
    type: Types.TaskType,
    description: 'a single task item',
    args: {
      id: {
        type: GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: (parents, args, ctx) => {
      return ctx.proxy.activity.findById(args.id);
    },
  },
};

const mutationFields = {
  task_del: {
    type: Types.TaskType,
    description: '删除 task',
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (obj, args, ctx) => ctx.proxy.activity.removeAct(args.id),
  },
  task_add: {
    type: Types.TaskType,
    description: '新增 task',
    args: {
      act_id: { type: GraphQLNonNull(GraphQLString) },
      act_intro: { type: GraphQLString },
      act_keyword: { type: GraphQLNonNull(GraphQLString) },
      app_id: { type: GraphQLNonNull(GraphQLString) },
      thumb_media_id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (obj, args, ctx) => {
      const {
        act_id,
        act_intro,
        act_keyword,
        app_id,
        // id,
        thumb_media_id,
      } = args;
      const act_name = await ctx.service.activity.getActName(act_id);
      const account = await ctx.proxy.account.adminDetail(app_id);
      return await ctx.proxy.activity.add({ app_id, account_name: account.name, act_id, act_name, act_keyword, act_intro, thumb_media_id });
    },
  },
  task_update: {
    type: Types.TaskType,
    description: '更新 task',
    args: {
      act_id: { type: GraphQLNonNull(GraphQLString) },
      act_intro: { type: GraphQLString },
      act_keyword: { type: GraphQLNonNull(GraphQLString) },
      app_id: { type: GraphQLNonNull(GraphQLString) },
      id: { type: GraphQLNonNull(GraphQLInt) },
      thumb_media_id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (obj, args, ctx) => {
      const {
        act_id,
        act_intro,
        act_keyword,
        app_id,
        id,
        thumb_media_id,
      } = args;
      const act_name = await ctx.service.activity.getActName(act_id);
      const account = await ctx.proxy.account.adminDetail(app_id);
      return ctx.proxy.activity.update({ id, app_id, account_name: account.name, act_id, act_intro, act_name, act_keyword, thumb_media_id });
    },
  },
};

module.exports = {
  queryFields,
  mutationFields,
};

