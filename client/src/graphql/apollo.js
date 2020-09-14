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

const wsLink = new WebSocketLink({
  uri: "wss://word-bench.herokuapp.com/graphql",
  // uri: "ws://localhost:3001/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      userId: getUserId(),
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  userHeaderLink.concat(httpLink)
);

export const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: splitLink,
});

export default client;
