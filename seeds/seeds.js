const mongoose = require('mongoose');
const User = require('../models/User.model');
const Professional = require('../models/Professional.model');
const Story = require('../models/Story.model');
const Theme = require('../models/Theme.model');
const { faker } = require('@faker-js/faker/locale/fr');

const dotenv = require('dotenv');
dotenv.config();

const { MONGO_URI_DEV, MONGO_URI } = require('../utils/consts');

const DB_URI = process.env.ENV === 'DEV' ? MONGO_URI_DEV : MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(async (x) => {
    console.log(
      `Connected to Mongo Gary! Database name: '${x.connections[0].name}'`
    );
    await seedDB();
    await mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// create fake professionals to insert in DB
function generateFakeProfessionals(quantity) {
  const professionals = [];
  for (let i = 0; i < quantity; i++) {
    const profName = faker.name.lastName();
    let professional = {
      name: profName,
      address: faker.address.streetAddress(true),
      zipcode: faker.address.zipCode('#####'),
      city: faker.address.cityName(),
      country: faker.address.country(),
      domain: `www.dr-${profName.toLowerCase()}.com`,
    };
    professionals.push(professional);
  }
  return professionals;
}
//
// getRandomFromArray
function getRandomFromArray(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
// create fake users to insert in DB
function generateFakeUsers(quantity, themesDB) {
  const users = [];
  for (let i = 0; i < quantity; i++) {
    const selected3Themes = getRandomFromArray(themesDB, 3);
    const most3ActiveThemes = getRandomFromArray(themesDB, 3);
    console.log('selected 3 ** : ', selected3Themes);
    // console.log('most active 3 ** : ', most3ActiveThemes);
    //
    const lastname = faker.name.lastName();
    const firstname = faker.name.firstName();
    //
    let user = {
      lastname: lastname,
      firstname: firstname,
      username: `${firstname}-${i}`,
      email: `${firstname}-${lastname}@test.com`.toLowerCase(),
      password: 'password',
      dateOfBirth: faker.date.birthdate({ min: 18, max: 72, mode: 'age' }),
      biography: faker.word.adjective(),
      selectedThemes: selected3Themes,
      mostActiveThemes: most3ActiveThemes,
      followers: null,
      followings: null,
      stayConnected: false,
      isRegistered: true,
      isPrivate: false,
      isModerator: false,
      isAdmin: false,
      isPlumeDor: i % 6 === 0 ? true : false,
      isReported: false,
      stories: [],
    };
    users.push(user);
  }
  return users;
}
async function seedDB() {
  try {
    await Professional.deleteMany();
    await User.deleteMany();
    const professionals = generateFakeProfessionals(30);
    const professionalsDB = await Professional.create(professionals);
    themesFromDB = await Theme.find();
    const users = generateFakeUsers(10, themesFromDB);
    const usersDB = await User.create(users);
  } catch (error) {
    console.log(`An error occurred while creating users from the DB: ${error}`);
  }
}
