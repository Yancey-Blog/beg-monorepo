import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { persistCache } from 'apollo-cache-persist'
import SnackbarUtils from 'src/components/Toast/Toast'

const httpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_BEG_SERVICE_DOMAIN
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
})

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

const cache = new InMemoryCache()

async function handlePersistCache() {
  await persistCache({
    cache,
    // @ts-ignore
    storage: window.localStorage,
    maxSize: false
  })
}

handlePersistCache()

const client = new ApolloClient({
  cache,
  resolvers: {},
  link: from([errorLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
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

export default client
