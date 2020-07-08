const express = require('express')
const expressGraphQL = require('express-graphql')
const Dataloader = require('dataloader')
const ramda = require('ramda')

const app = express()
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLInterfaceType
} = require('graphql')


// 定义具有name字段的Animal接口

var animals=[
    {
        name: 'dog',
        legs: 4
    },
    {
        name: 'fish',
        tailColor:'red'
    },
];

// 当一个字段可能返回多种不同类型时，可使用接口类型 GraphQLInterfaceType，来描述所有可能类型必须有的共同字段，也可指定 resolveType 函数来决定该字段实际被解析时为何种类型。
// 当一个字段可以返回多种不同类型时，可使用联合类型 GraphQLUnionType 描述所有可能类型，也可指定 resolveType 函数来决定该字段实际被解析时为何种类型。


const Animal = new GraphQLInterfaceType({
    name: 'Animal',
    description: '接口',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
    }),
    resolveType: function (obj) {
        console.log(2222, obj)
        if (obj.legs) {
            return Dog;
        } else if (obj.tailColor) {
            return Fish;
        } else {
            return null;
        }
    }
});

const Dog = new GraphQLObjectType({
    name: 'Dog',
    interfaces: [Animal],
    description: '狗狗实体',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        legs: {type: new GraphQLNonNull(GraphQLInt)},
    }),
    isTypeOf: obj => obj.legs,
});

const Fish = new GraphQLObjectType({
    name: 'Fish',
    interfaces: [Animal],
    description: "鱼儿实体",
    fields: () => {
        return ({
            name: {type: new GraphQLNonNull(GraphQLString)},
            tailColor: {type: new GraphQLNonNull(GraphQLString)},
        });
    },
    isTypeOf: obj => obj.tailColor,
});

// 实现的定义



const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        animal: {
            type: Animal,
            description: 'animals',
            // args: {
            //     name: { type: GraphQLInt }
            // },
            resolve: (parent, args, ctx) => {
                return animals[0]
            }
        }
    })
})


const schema = new GraphQLSchema({
    query: RootQueryType,
})

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}))
app.listen(4182, () => console.log('http://localhost:4182/graphql'))