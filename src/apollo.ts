import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'

import { cache } from './cache';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // clientState: {
  //   defaults: {
  //     auth: {
  //       __typename: 'Auth',
  //       isLoggedIn: Boolean(localStorage.getItem('jwt')),
  //     },
  //   },
  // },
  // resolvers: {
  //   Mutation: {
  //     logUserIn: (_, __, { cache }) => {},
  //     logUserOut: (_, __, { cache }) => {
  //       localStorage.removeItem('jwt')
  //       cache.writeData({
  //         auth: {
  //           __typename: 'Auth',
  //           isLoggedIn: false,
  //         },
  //       })
  //     },
  //   },
  // },
  // headers: {
  //   authorization: localStorage.getItem('token') || '',
  // },
  headers: {
    'X-JWT': localStorage.getItem('jwt') || '',
  },
  // request: async (operation: Operation) => {
  //   operation.setContext({
  //     headers: {
  //       'X-JWT': localStorage.getItem('jwt') || '',
  //     },
  //   })
  // },
  uri: 'http://localhost:4000/graphql',
  cache,
  typeDefs,
})

export default client
