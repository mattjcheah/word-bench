import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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
  uri: `/api/graphql`,
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
  connectToDevTools: true,
});

export default client;
