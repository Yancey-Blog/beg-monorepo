import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import SnackbarUtils from 'src/components/Toast/Toast'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((graphQLError) => {
      SnackbarUtils.error(`[GraphQL error]: ${graphQLError.message}`)
    })
  }

  if (networkError) {
    SnackbarUtils.error(`[Network error]: ${networkError.message}`)
  }
})

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'same-origin'
})

export function createApolloClient() {
  if (apolloClient) return apolloClient

  return new ApolloClient({
    resolvers: {},
    ssrMode: typeof window === 'undefined',
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only'
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  })
}
