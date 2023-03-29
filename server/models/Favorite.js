const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meme: {
    type: Schema.Types.ObjectId,
    ref: 'Meme',
    required: true,
  },
});

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
