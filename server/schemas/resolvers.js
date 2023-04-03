const { AuthenticationError } = require("apollo-server-express");
const { User, Meme } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find().populate("memes");
    },

    // get a single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("memes");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("memes");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // memes query, returns all memes from db and populates the creator, likes  fields
    memes: async () => {
      const memes = await Meme.find().populate("creator").populate("likes");
      return memes;
    },

    // meme query, returns a single meme from db and populates the creator, likes fields
    meme: async (parent, { id }) => {
      const meme = await Meme.findById(id)
        .populate("creator")
        .populate("likes");
      if (!meme) {
        throw new Error("Meme not found");
      }
      return meme;
    },

    // userMemes query, returns all memes created by a user and populates the creator, likes fields
    userMemes: async (parent, args, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const memes = await Meme.find({ creator: user._id })
        .populate("creator")
        .populate("likes");

      return memes;
    }, // userMemes
  }, // Query

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    }, // addUser

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
    }, // login
    
    saveMemeAndUser: async (parent, { userId, memeId, imageUrl, id }) => {
      try {
        const meme = new Meme({
          memeId,
          imageUrl,
          _id: id
        });
        const savedMeme = await meme.save();
        const user = await User.findById(userId);
        user.memes.push(savedMeme._id);
        const updatedUser = await user.save().populate('memes');
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Error saving meme and user');
      }
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
    }, // deleteMeme

    //add mutation for adding a like to a meme
    // finding the meme by id
    // checking if the meme exists
    // checking if the user has already liked the meme
    // increment the meme.likes by 1 and save the meme to the db
    addLike: async (parent, { memeId }, { User, Meme, user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in to like a meme");
      }
    
      const meme = await Meme.findById(memeId);
    
      if (!meme) {
        throw new UserInputError("Invalid meme ID");
      }
    
      const hasLiked = meme.likes.includes(user._id);
    
      if (hasLiked) {
        await Meme.findByIdAndUpdate(memeId, {
          $pull: { likes: user._id },
          $inc: { numLikes: -1 },
        });
      } else {
        await Meme.findByIdAndUpdate(memeId, {
          $push: { likes: user._id },
          $inc: { numLikes: 1 },
        });
      }
    
      return {
        numLikes: meme.numLikes,
        hasLiked: !hasLiked,
      };
    }, // addLike    
  }, // Mutation
}; // resolvers

module.exports = resolvers;
