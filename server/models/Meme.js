const { Schema, model } = require('mongoose');

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
            ref: 'User',
            required: true,
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
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Favorite',
            }
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