const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID 
    username: String 
    email: String 
    password: String 
  }

  type Meme {
    _id: ID!
    title: String!
    imageUrl: String!
    creator: User!
    ratings: [Int!]
    comments: [Comment!]
    favorites: [Favorite!]

  }

  type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String!
    createdAt: String!
  }

  type Favorite {
    _id: ID!
    meme: Meme!
    user: User!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;