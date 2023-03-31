const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    memes: [Meme!]!
    comments: [Comment!]!
    favorites: [Favorite!]!
  }

  type Meme {
    _id: ID
    title: String
    imageUrl: String
    creator: User
    ratings: Int
    comments: [Comment]
    favorites: [Favorite]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: User
    createdAt: String
  }

  type Favorite {
    _id: ID
    meme: Meme
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Rating {
    id: ID!
    user: User!
    meme: Meme!
  }

  type Query {
    user(username: String!): User
    users: [User]!
    me: User
    meme(id: ID!): Meme
    memes: [Meme!]!
    userMemes: [Meme!]!
    getComment(memeId: ID!, commentId: ID!): Comment
    getCommentsByMemeId(memeId: ID!): [Comment]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User!
    createMeme(title: String!, imageUrl: String!): Meme!
    updateMeme(id: ID!, title: String!, imageUrl: String!): Meme!
    deleteMeme(id: ID!): Meme!
    addComment(memeId: ID!, commentText: String!): Meme
    updateComment(memeId: ID!, commentId: ID!, commentText: String!): Meme
    removeComment(memeId: ID!, commentId: ID!): Meme
  }
`;

module.exports = typeDefs;
