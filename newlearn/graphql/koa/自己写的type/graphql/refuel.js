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

const refuelPageationType = new GraphQLObjectType({
  name: 'refuelPageationType',
  description: 'refuel pageation list',
  fields: () => ({
    list: {
      type: new GraphQLList(Types.RefuelType),
    },
    pageation: {
      type: Types.PageationType,
    },
  }),
});

const queryFields = {
  refuel_list: {
    type: refuelPageationType,
    description: 'refuel pageation list',
    args: {
      current: { type: GraphQLInt },
      pageSize: { type: GraphQLInt },
    },
    resolve: (parent, args, ctx) => ctx.proxy.refuel.findList({
      current: args.current,
      pageSize: args.pageSize,
    }),
  },
  refuel_item: {
    type: Types.RefuelType,
    description: 'a single refuel item',
    args: {
      id: {
        type: GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: (parents, args, ctx) => {
      return ctx.proxy.refuel.findById(args.id);
    },
  },
};

const mutationFields = {
  refuel_del: {
    type: Types.RefuelType,
    description: '删除 refuel',
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (obj, args, ctx) => ctx.proxy.refuel.remove(args.id),
  },
  refuel_add: {
    type: Types.RefuelType,
    description: '新增 refuel',
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
        thumb_media_id,
      } = args;
      const act_name = await ctx.service.activity.getActName(act_id);
      const account = await ctx.proxy.account.adminDetail(app_id);
      if (account === null) {
        throw new Error(`act_id:${act_id} has not bind on this plat platform`);
      }
      return await ctx.proxy.refuel.add({ app_id, account_name: account.name, act_id, act_name, act_keyword, act_intro, thumb_media_id });
    },
  },
  refuel_update: {
    type: Types.RefuelType,
    description: '更新 refuel',
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
      return ctx.proxy.refuel.update({ id, app_id, account_name: account.name, act_id, act_intro, act_name, act_keyword, thumb_media_id });
    },
  },
};

module.exports = {
  queryFields,
  mutationFields,
};

