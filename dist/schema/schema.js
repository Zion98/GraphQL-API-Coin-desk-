"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const CalculatePrice = new graphql_1.GraphQLObjectType({
    name: 'price',
    fields: () => ({
        price: { type: graphql_1.GraphQLInt }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {}
});
