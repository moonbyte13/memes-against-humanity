const db = require('../config/connection');
const { User } = require('../models');
// const { Meme } = require('../models');

const userData = require('./userSeeds.json');
// const memeData = require('./memeSeeds.json');

db.once('open', async function() {
  try {
    await User.deleteMany({});
    console.log('Users collection cleared');
    const users = await User.insertMany(userData);
    console.log('Users seeded:', users.length);

    // await Meme.deleteMany({});
    // console.log('Memes collection cleared');
    // const memes = await Meme.insertMany(memeData);
    // console.log('Memes seeded:', memes.length);

    process.exit(0);
  } catch (err) {
    console.log('Error seeding database:', err);
    process.exit(1);
  }
});
