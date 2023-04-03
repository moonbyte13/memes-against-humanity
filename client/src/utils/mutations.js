import { gql } from "@apollo/client";

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

// creating a mutation for liking a meme
export const ADD_LIKE = gql`
  mutation AddLike($memeId: ID!) {
    addLike(memeId: $memeId) {
      imageUrl
      numLikes
      hasLiked
    }
  }
`;

export const SAVE_MEME_AND_USER = gql`
  mutation saveMemeAndUser($userId: ID!, $memeId: String!, $imageUrl: String!) {
    saveMemeAndUser(userId: $userId, memeId: $memeId, imageUrl: $imageUrl) {
      _id
      username
      email
      memes {
        _id
        memeId
        imageUrl
      }
    }
  }
`;
