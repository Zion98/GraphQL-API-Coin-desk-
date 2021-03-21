"use strict";
// const { buildSchema } = require("graphql");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // GraphQL Schema
// var schema = buildSchema(`
//     type Query {
//         calculatePrice(type: String, margin: Float, exchangeRate: String):calculatedPrice
//     }
//     type calculatedPrice {
//         price: Float,
//         currency: String,
//         type: String
//     }
// `);
// export default schema;
const service_1 = __importDefault(require("./service"));
const graphql_1 = require("graphql");
const calculatePriceType = new graphql_1.GraphQLObjectType({
    name: 'calculatePrice',
    description: "price calculate",
    fields: () => ({
        price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        currency: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        calculatePrices: {
            type: calculatePriceType,
            args: {
                type: { type: graphql_1.GraphQLString },
                margin: { type: graphql_1.GraphQLFloat },
                exchangeRate: { type: graphql_1.GraphQLString },
            },
            resolve: async (_, args) => {
                return service_1.default(args);
            }
        }
    })
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery
});
exports.default = schema;
