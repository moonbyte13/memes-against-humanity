const db = require('../config/connection');
const { User } = require('../models');
const userData = require('./userSeeds.json');

db.once('open', async function() {
  try {
    await User.deleteMany({});
    console.log('Users collection cleared');
    const users = await User.insertMany(userData);
    console.log('Users seeded:', users.length);

    await db.collection('memes').dropIndex({title: 1});
    await db.collection('memes').deleteMany({});
    console.log('Memes collection cleared');
    // const memeData = require('./memeSeeds.json');
    // const memes = await Meme.insertMany(memeData);
    // console.log('Memes seeded:', memes.length);

    process.exit(0);
  } catch (err) {
    console.log('Error seeding database:', err);
    process.exit(1);
  }
});
