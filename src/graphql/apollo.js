import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import getUserId from "../config/getUserId";

const userHeaderLink = setContext((_, { headers }) => {
  const userId = getUserId();

  return {
    headers: {
      ...headers,
      "X-User-Id": userId,
    },
  };
});

const httpLink = new HttpLink({
  uri: "https://word-bench.herokuapp.com/graphql",
  // uri: "http://localhost:3001/graphql",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Room: {
      fields: {
        stage: {
          merge(existing, incoming) {
            return existing === "COMPLETE" ? existing : incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: userHeaderLink.concat(httpLink),
});

export default client;
