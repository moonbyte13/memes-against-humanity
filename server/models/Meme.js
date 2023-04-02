const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
); // meme schema

const Meme = model("Meme", memeSchema);

module.exports = Meme;
