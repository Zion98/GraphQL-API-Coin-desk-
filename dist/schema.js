"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolverFunc_1 = __importDefault(require("./resolverFunc"));
const graphql_1 = require("graphql");
const calculatePriceType = new graphql_1.GraphQLObjectType({
    name: "calculatePrice",
    description: "price calculate",
    fields: () => ({
        currentPrice: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        currency: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        calculatePrice: {
            type: calculatePriceType,
            args: {
                type: { type: graphql_1.GraphQLString },
                margin: { type: graphql_1.GraphQLFloat },
                exchangeRate: { type: graphql_1.GraphQLInt },
            },
            resolve: async (_, args) => {
                return resolverFunc_1.default(args);
            },
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
exports.default = schema;
