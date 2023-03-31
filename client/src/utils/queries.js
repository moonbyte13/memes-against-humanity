import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me {
      _id
      email
      username
      memes {
        _id
        title
        imageUrl
        creator {
          _id
          username
          email
        }
        ratings
        comments {
          _id
          commentText
          commentAuthor {
            _id
            username
          }
          createdAt
        }
      }
      favorites {
        _id
        meme {
          _id
          title
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      username
      memes {
        _id
        title
        imageUrl
        creator {
          _id
          username
          email
        }
        ratings
        comments {
          _id
          commentText
          commentAuthor {
            _id
            username
          }
          createdAt
        }
      }
      favorites {
        _id
        meme {
          _id
          title
        }
      }
    }
  }
`;
