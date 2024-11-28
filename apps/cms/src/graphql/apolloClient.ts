import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { enqueueSnackbar } from 'notistack'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BEG_SERVICE_DOMAIN
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
      enqueueSnackbar(`[GraphQL error]: ${graphQLError.message}`, {
        variant: 'error'
      })
    })
  }

  if (networkError) {
    enqueueSnackbar(`[Network error]: ${networkError.message}`, {
      variant: 'error'
    })
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
