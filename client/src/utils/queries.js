import { gql } from "@apollo/client";

export const QUERY_MEMES = gql`
  query {
    memes {
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
        }
        likes
        likedBy {
          _id
          username
        }
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
        }
        likes
        likedBy {
          _id
          username
        }
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

// query for single meme
export const QUERY_MEME = gql`
  query meme($id: ID!) {
    meme(_id: $id) {
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
