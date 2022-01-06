import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'
import SnackbarUtils from 'src/components/Toast/Toast'

const isServer = typeof window === 'undefined'
// @ts-ignore
const windowApolloState = !isServer && window.__NEXT_DATA__?.apolloState
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

const httpLink = new BatchHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'same-origin'
})

export function createApolloClient() {
  if (apolloClient) return apolloClient

  return new ApolloClient({
    resolvers: {},
    ssrMode: isServer,
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache().restore(windowApolloState || {}),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
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
