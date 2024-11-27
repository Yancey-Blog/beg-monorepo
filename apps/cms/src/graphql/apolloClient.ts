import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import SnackbarUtils from 'src/components/Toast/Toast'

const httpLink = new HttpLink({
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {},
  link: from([errorLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
})

export default client
