import { createServer } from "@graphql-yoga/node";
import typeDefs from "../../server/graphql/typeDefs";
import resolvers from "../../server/graphql/resolvers";
import createContext from "../../server/graphql/createContext";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: createContext,
});

export default server;
