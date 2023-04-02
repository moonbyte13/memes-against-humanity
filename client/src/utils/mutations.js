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

// creating a mutation to add a meme
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
      likes
      likedBy {
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
      id
      imageUrl
      likes
      likedBy {
        id
        username
      }
    }
  }
`;

export const SAVE_MEME = gql`
  mutation saveMeme($memeId: ID!, $imageUrl: String!) {
    saveMeme(memeId: $memeId, imageUrl: $imageUrl) {
      _id
      imageUrl
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
