'use strict';
// 公众号
const Types = require('./types');

const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const accountPageationType = new GraphQLObjectType({
  name: 'accountPageationType',
  description: 'account pageation list',
  fields: () => ({
    list: {
      type: new GraphQLList(Types.AccountType),
    },
    pageation: {
      type: Types.PageationType,
    },
  }),
});

const queryFields = {
  account_list: {
    type: accountPageationType,
    description: 'account pageation list',
    args: {
      current: {
        type: GraphQLInt,
      },
      pageSize: {
        type: GraphQLInt,
      },
    },
    resolve: (parent, args, ctx) => ctx.proxy.account.adminList({
      current: args.current,
      pageSize: args.pageSize,
    }),
  },
  account_item: {
    type: Types.AccountType,
    description: 'a single account item',
    args: {
      appid: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (parents, args, ctx) => {
      return ctx.proxy.account.adminDetail(args.appid);
    },
  },
};


const mutationFields = {
  account_update: {
    type: Types.AccountType,
    description: '更新 account',
    args: {
      appid: {
        type: GraphQLNonNull(GraphQLString),
      },
      contact: {
        type: GraphQLString,
      },
      contact_phone: {
        type: GraphQLString,
      },
      remark: {
        type: GraphQLString,
      },
      type: {
        type: GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: (obj, args, ctx) => {
      const {
        appid,
        contact,
        contact_phone,
        remark,
        type,
      } = args;
      return ctx.proxy.account.update(appid, {
        contact,
        contact_phone,
        remark,
        type,
      });
    },
  },
};


module.exports = {
  queryFields,
  mutationFields,
};
