const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const memeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Number,
        default: 0,
      },
    ],
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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
        ref: "Favorite",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
); // meme schema

const Meme = model("Meme", memeSchema);

module.exports = Meme;
