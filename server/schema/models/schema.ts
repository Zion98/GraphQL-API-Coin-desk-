import convertRate from "../controllers/resolverFunc";
import {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";

const calculatePriceType = new GraphQLObjectType({
  name: "calculatePrice",
  description: "price calculate",
  fields: () => ({
    currentPrice: { type: new GraphQLNonNull(GraphQLFloat) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    calculatePrice: {
      type: calculatePriceType,
      args: {
        type: { type: GraphQLString },
        margin: { type: GraphQLFloat },
        exchangeRate: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        return convertRate(args);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
