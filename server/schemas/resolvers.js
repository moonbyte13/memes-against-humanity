const { AuthenticationError } = require("apollo-server-express");
const { User, Meme, Comment, Favourite } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // memes query, returns all memes from db and populates the creator, ratings, comments and favorites fields
    memes: async () => {
      const memes = await Meme.find()
        .populate("creator")
        .populate("ratings")
        .populate("comments")
        .populate("favorites");
      return memes;
    },

    // meme query, returns a single meme from db and populates the creator, ratings, comments and favorites fields
    meme: async (parent, { id }) => {
      const meme = await Meme.findById(id)
        .populate("creator")
        .populate("ratings")
        .populate("comments")
        .populate("favorites");
      if (!meme) {
        throw new Error("Meme not found");
      }
      return meme;
    },
    // userMemes query, returns all memes created by a user and populates the creator, ratings, comments and favorites fields
    userMemes: async (parent, args, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const memes = await Meme.find({ creator: user._id })
        .populate("creator")
        .populate("ratings")
        .populate("comments")
        .populate("favorites");
      return memes;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    //add mutation for creating a meme
    // the creator field is populated with the user._id
    // creating a new Meme instance with the title and imageUrl arguments
    // saving the meme to the db
    createMeme: async (parent, { title, imageUrl }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const meme = new Meme({ title, imageUrl, creator: user._id });
      await meme.save();
      return meme;
    },
    //add mutation for updating a meme
    // finding the meme by id
    // checking if the meme exists
    // checking if the user is the creator of the meme
    // updating the title and imageUrl fields
    // saving the meme to the db
    updateMeme: async (parent, { id, title, imageUrl }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const meme = await Meme.findById(id);
      if (!meme) {
        throw new Error("Meme not found");
      }
      if (meme.creator.toString() !== user._id.toString()) {
        throw new Error("Not authorized to update this meme");
      }
      meme.title = title || meme.title;
      meme.imageUrl = imageUrl || meme.imageUrl;
      await meme.save();
      return meme;
    },
    //add mutation for deleting a meme
    // finding the meme by id
    // checking if the meme exists
    // checking if the user is the creator of the meme
    // deleting the meme
    deleteMeme: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const meme = await Meme.findById(id);
      if (!meme) {
        throw new Error("Meme not found");
      }
      if (meme.creator.toString() !== user._id.toString()) {
        throw new Error("Not authorized to delete this meme");
      }
      await meme.deleteOne();
      return true;
    },
  },
};

module.exports = resolvers;
