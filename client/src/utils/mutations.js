import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($memeId: ID!, $commentText: String!) {
    addComment(memeId: $memeId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const CREATE_MEME = gql`
  mutation createMeme($title: String!, $imageUrl: String!) {
    createMeme(title: $title, imageUrl: $imageUrl) {
      _id
      title
      imageUrl
      creator {
        _id
        username
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
  }
`;
