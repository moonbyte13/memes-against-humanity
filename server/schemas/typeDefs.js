const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    memes: [Meme!]!
  }

  type Meme {
    _id: ID
    title: String
    imageUrl: String
    creator: User
    likes: Int
    likedBy: [User] # this is an array of users who liked the meme
  }

  type Auth {
    token: ID!
    user: User
  }

  type likes { # this is the likes document that is created when a user rates a meme
    id: ID! # this is the _id of the likes document
    user: User! # this is the user who created the likes
    meme: Meme! # this is the meme that was rated
  }

  type Query {
    user(username: String!): User
    users: [User]
    me: User
    meme(id: ID!): Meme
    memes: [Meme!]!
    userMemes: [Meme!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth # returns an Auth object containing a token and user
    addUser(username: String!, email: String!, password: String!): Auth # returns a User object
    createMeme(title: String!, imageUrl: String!): Meme! # returns a Meme object
    updateMeme(id: ID!, title: String!, imageUrl: String!): Meme! # returns a Meme object
    deleteMeme(id: ID!): Meme! # returns a Meme object
    addLike(memeId: ID!): Meme
    removeLike(memeId: ID!): Meme
  }
`;

module.exports = typeDefs;
