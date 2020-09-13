import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import getUserId from "../config/getUserId";

const userHeaderLink = setContext((_, { headers }) => {
  // Find or create userId in localStorage
  // const userId = localStorage.getItem("userId") || uuid();
  // localStorage.setItem("userId", userId);

  const userId = getUserId();

  return {
    headers: {
      ...headers,
      "X-User-Id": userId,
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
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
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: userHeaderLink.concat(splitLink),
});

export default client;
