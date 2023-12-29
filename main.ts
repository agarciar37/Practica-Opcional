import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/schema.ts";
import { Client } from "./resolvers/Clients.ts";
import { DeliveryMan } from "./resolvers/DeliveryMan.ts";
import { Order } from "./resolvers/Order.ts";
import { Restaurant } from "./resolvers/Restaurant.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";

const server = new ApolloServer(
  {
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Client,
      Restaurant,
      DeliveryMan,
      Order,
    },
  }
)

const { url } = await startStandaloneServer(server);
console.info(`🚀 Server ready at ${url}`);