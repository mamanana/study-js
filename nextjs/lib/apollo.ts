import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// 2
const origin = typeof window !== 'undefined' ? window.location.origin : process.env.BASE_URL

const apiBase = new URL('/api/graphql', origin).toString();

const httpLink = createHttpLink({
  useGETForQueries: true,
  uri: apiBase
});

// 3
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient