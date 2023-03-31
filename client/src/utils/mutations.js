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

// creating a mutation to add a meme
export const ADD_MEME = gql`
  mutation createMeme($title: String!, $imageUrl: String!) {
    createMeme(title: $title, imageUrl: $imageUrl) {
      _id
      title
      imageUrl
      creator {
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
      title
      imageUrl
      likes
      likedBy {
        id
        username
      }
    }
  }
`;

// creating a mutation for adding a favorite meme
export const ADD_FAVORITE = gql`
  mutation AddFavourite($memeId: ID!) {
    addFavourite(memeId: $memeId) {
      id
      title
      imageUrl
      favourites {
        id
        username
      }
    }
  }
`;
