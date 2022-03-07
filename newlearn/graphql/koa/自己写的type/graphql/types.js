'use strict';
/*eslint-disable*/
// 基于 graphql、定义类型特性会出现与 eslint 冲突部分，当前文件忽视 eslint

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const RefuelType = new GraphQLObjectType({
  name: 'refuel',
  description: '加油',
  fields: () => ({
    account_name: { type: GraphQLString },
    act_id: { type: GraphQLString },
    act_intro: { type: GraphQLString },
    act_keyword: { type: GraphQLString },
    act_name: { type: GraphQLString },
    app_id: { type: GraphQLString },
    thumb_media_id: { type: GraphQLString },
    id: { type: GraphQLInt },
    account: {
      type: AccountType,
      resolve: (parent, args, ctx) => {
        return ctx.proxy.account.adminDetail(parent.app_id);
      },
    },
  }),
});

const TaskType = new GraphQLObjectType({
  name: 'task',
  description: '任务',
  fields: () => ({
    account_name: { type: GraphQLString },
    act_id: { type: GraphQLString },
    act_intro: { type: GraphQLString },
    act_keyword: { type: GraphQLString },
    act_name: { type: GraphQLString },
    app_id: { type: GraphQLString },
    thumb_media_id: { type: GraphQLString },
    id: { type: GraphQLInt },
    account: {
      type: AccountType,
      resolve: (parent, args, ctx) => {
        return ctx.proxy.account.adminDetail(parent.app_id);
      },
    },
  }),
});

const AccountType = new GraphQLObjectType({
  name: 'account',
  description: '公众号',
  fields: () => ({
    appid: { type: GraphQLString },
    nick_name: { type: GraphQLString },
    head_img: { type: GraphQLString },
    qrcode_url: { type: GraphQLString },
    principal_name: { type: GraphQLString },
    signature: { type: GraphQLString },
    contact: { type: GraphQLString },
    contact_phone: { type: GraphQLString },
    remark: { type: GraphQLString },
    type: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    name: { type: GraphQLString },
    isBind: { type: GraphQLString },
  }),
});

const PageationType = new GraphQLObjectType({
  name: 'pageation',
  description: '分页',
  fields: () => ({
    current: {
      type: GraphQLInt,
    },
    total: {
      type: GraphQLInt,
    },
    pageSize: {
      type: GraphQLInt,
    },
  }),
});

module.exports = {
  AccountType,
  TaskType,
  RefuelType,
  PageationType,
};
