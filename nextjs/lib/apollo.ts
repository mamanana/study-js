import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const origin = process.env.BASE_URL

const apiBase = new URL('/api/graphql', origin).toString();

const httpLink = createHttpLink({
  useGETForQueries: true,
  uri: apiBase
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient