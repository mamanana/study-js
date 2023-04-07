import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const origin = process.env.BASE_URL

const apiBase = new URL('/api/graphql', origin).toString();

const httpLink = createHttpLink({
  useGETForQueries: true,
  uri: apiBase
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient