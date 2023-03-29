const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID 
    username: String 
    email: String 
    password: String 
  }

  type Meme {
    _id: ID
    title: String
    imageUrl: String
    creator: User
    ratings: [Int]
    comments: [Comment]
    favorites: [Favorite]

  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
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

  type Query {
    me: User
    memes: [Meme!]
    meme(_id: ID!): Meme
    getComment(memeId: ID!, commentId: ID!): Comment
    getCommentsByMemeId(memeId: ID!): [Comment]
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(memeId: ID!, commentText: String!): Meme
    updateComment(memeId: ID!, commentId: ID!, commentText: String!): Meme
    removeComment(memeId: ID!, commentId: ID!): Meme

  }
`;

module.exports = typeDefs;