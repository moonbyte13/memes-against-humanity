const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const memeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    creator: {
      type: String,
      required: true,
      trim: true
    },
    ratings: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Favorite',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
); // meme schema

const Meme = model('Meme', memeSchema);

module.exports = Meme;
