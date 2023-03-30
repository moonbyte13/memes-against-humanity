const db = require('../config/connection');
const { User } = require('../models');
// const { Meme } = require('../models');

const userData = require('./userSeeds.json');
// const memeData = require('./memeSeeds.json');

// User seeds
db.once('open', async () => {
  await User.deleteMany({});

  const users = await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});

// Meme seeds
// db.once('open', async () => {
//   await Meme.deleteMany({});

//   const users = await Meme.insertMany(memeData);

//   console.log('Memes seeded!');
//   process.exit(0);
// });
