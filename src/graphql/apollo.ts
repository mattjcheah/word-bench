import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `/api/graphql`,
});

export const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: httpLink,
  connectToDevTools: true,
});

export default client;
