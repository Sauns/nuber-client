import { gql } from '@apollo/client'

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    #   auth {
    #     isLoggedIn @client
    #  }
    isLoggedIn @client
  }
`

// export const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;
