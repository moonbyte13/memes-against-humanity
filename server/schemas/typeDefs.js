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

  type Auth {
    token: ID!
    user: User
  }
  type Meme {
    id: ID!
    title: String!
    imageUrl: String!
    creator: User! # 
    ratings: [Rating!]!
    comments: [Comment!]!
    favorites: [Favorite!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    meme: Meme!
    likes: Int!
  }

  type Favorite {
    id: ID!
    user: User!
    meme: Meme!
  }

  type Rating {
    id: ID!
    user: User!
    meme: Meme!
  }

  type Query {
    me: User
    meme(id: ID!): Meme
    memes: [Meme!]!
    userMemes: [Meme!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User!
    createMeme(title: String!, imageUrl: String!): Meme!
    updateMeme(id: ID!, title: String!, imageUrl: String!): Meme!
    deleteMeme(id: ID!): Meme!
  }
`;

module.exports = typeDefs;
