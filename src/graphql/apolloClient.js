import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const savedAuth = JSON.parse(localStorage.getItem('devportal_auth') || 'null')

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: savedAuth?.token ? `Bearer ${savedAuth.token}` : '',
    },
  }))

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client