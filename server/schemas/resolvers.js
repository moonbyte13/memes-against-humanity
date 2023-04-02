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
    }, // createMeme

    saveMeme: async (_, { memeId, imageUrl }) => {
      try {
        const meme = new Meme({ memeId, imageUrl });
        const savedMeme = await meme.save();
        return savedMeme;
      } catch (error) {
        console.error(error);
        throw new Error('Error saving meme');
      }
    },
    
    saveUserMeme: async (_, { userId, memeId }) => {
      try {
        const user = await User.findById(userId);
        user.memes.push(memeId);
        const updatedUser = await user.save();
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Error saving user meme');
      }
    },
    
    saveMemeAndUser: async (_, { userId, memeId, imageUrl }) => {
      try {
        const meme = new Meme({ memeId, imageUrl });
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
    }, // updateMeme

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
    addLike: async (parent, { memeId }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }

      const meme = await Meme.findById(memeId);
      if (!meme) {
        throw new Error("Meme not found");
      }

      if (meme.likedBy.includes(user._id)) {
        throw new Error("You have already liked this meme");
      }

      meme.likes += 1;
      meme.likedBy.push(user._id);
      await meme.save();
      return meme;
    }, // addLike

    //add mutation for removing a like from a meme
    // finding the meme by id
    // checking if the meme exists
    // checking if the user has already liked the meme
    // decrement the meme.likes by 1 and save the meme to the db
    removeLike: async (parent, { memeId }, { user }) => {
      const meme = await Meme.findById(memeId);
      if (!meme) {
        throw new Error("Meme not found");
      }

      if (!meme.likedBy.includes(user._id)) {
        throw new Error("You have not liked this meme");
      }

      // filter likedBy array to remove user._id from someone who is unliking the meme
      meme.likedBy = meme.likedBy.filter(
        (userId) => userId.toString() !== user._id.toString()
      );
      meme.likes -= 1;
      await meme.save();

      return meme;
    }, // removeLike
  }, // Mutation
}; // resolvers

module.exports = resolvers;
