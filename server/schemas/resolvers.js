const { AuthenticationError } = require('apollo-server-express');
const { User, Meme } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }, // me

    // get a single comment by memeid and commentid
    getComment: async (parent, { memeId, commentId }, context) => {
      if (context.user) {
        const meme = await Meme.findById(memeId);
        const comment = meme.comments.id(commentId);
        if (!comment) {
          throw new Error('Comment not found');
        }

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    }, // getComment

    // get all comments by a memeid
    getCommentsByMemeId: async (parent, { memeId }, context) => {
      if (context.user) {
        const meme = await Meme.findById(memeId);
        if (!meme) {
          throw new Error('Meme not found');
        }
        return meme.comments;
      }
      throw new AuthenticationError('You need to be logged in!');
    }, // getCommentsByMemeId
  }, // Query

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    }, // addUser

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    }, // login

    addComment: async (parent, { memeId, commentText }, context) => {
      if (context.user) {
        return Meme.findOneAndUpdate(
          { _id: memeId },
          {
            $addToSet: {
              comments: {
                commentText,
                commentAuthor: context.user.username,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    }, // addComment

    updateComment: async (
      parent,
      { memeId, commentId, commentText },
      context
    ) => {
      if (context.user) {
        const meme = await Meme.findById(memeId);
        const comment = meme.comments.id(commentId);

        if (comment.commentAuthor !== context.user.username) {
          throw new AuthenticationError(
            'You are not authorized to update this comment'
          );
        }

        comment.commentText = commentText;

        return await meme.save();
      }
      throw new AuthenticationError('You need to be logged in!');
    }, // updateComment

    removeComment: async (parent, { memeId, commentId }, context) => {
      if (context.user) {
        return Meme.findOneAndUpdate(
          { _id: memeId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    }, // removeComment
  }, // mutations
}; // resolvers

module.exports = resolvers;
