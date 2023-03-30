import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      password
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      password
      username
    }
  }
`;
