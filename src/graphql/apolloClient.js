import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { getToken } from '../utils/authStorage'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }))

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client

