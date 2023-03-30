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
    likes: Int
    likedBy: [User] # this is an array of users who liked the meme
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

  type likes { # this is the likes document that is created when a user rates a meme
    id: ID! # this is the _id of the likes document
    user: User! # this is the user who created the likes
    meme: Meme! # this is the meme that was rated
  }

  type Query {
    me: User # returns the current user
    meme(id: ID!): Meme # returns a single meme by id
    memes: [Meme!]! # returns all memes
    userMemes: [Meme!]! # returns all memes created by the current user
    getComment(memeId: ID!, commentId: ID!): Comment # returns a single comment by memeId and commentId
    getCommentsByMemeId(memeId: ID!): [Comment] # returns all comments by memeId
  }

  type Mutation {
    login(email: String!, password: String!): Auth # returns an Auth object containing a token and user
    addUser(username: String!, email: String!, password: String!): User! # returns a User object
    createMeme(title: String!, imageUrl: String!): Meme! # returns a Meme object
    updateMeme(id: ID!, title: String!, imageUrl: String!): Meme! # returns a Meme object
    deleteMeme(id: ID!): Meme! # returns a Meme object
    addComment(memeId: ID!, commentText: String!): Meme
    updateComment(memeId: ID!, commentId: ID!, commentText: String!): Meme
    removeComment(memeId: ID!, commentId: ID!): Meme
    addLike(memeId: ID!): Meme
    removeLike(memeId: ID!): Meme
    addFavorite(memeId: ID!): Meme
    removeFavorite(memeId: ID!): Meme

  }
`;

module.exports = typeDefs;
