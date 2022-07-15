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
      domain: faker.lorem.words(2),
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
      biography: faker.random.words(10),
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
// create fake stories to insert in DB
function generateFakeStories(quantity, usersDB, themesDB, professionalsDB) {
  const stories = [];
  for (let i = 0; i < quantity; i++) {
    const writter = usersDB[Math.floor(Math.random() * usersDB.length)];
    const theme = themesDB[Math.floor(Math.random() * themesDB.length)];
    const professional =
      professionalsDB[Math.floor(Math.random() * professionalsDB.length)];
    //
    let story = {
      writter: writter._id,
      theme: theme._id,
      title: faker.random.words(5),
      content: faker.lorem.paragraphs(5),
      professionalConsulted: professional,
      ressources: null,
      physicalTransformation: {
        isSelected: true,
        bodyPart: null,
        treatment: faker.random.words(),
        beforePictureUrl: faker.internet.url(),
        afterPictureUrl: faker.internet.url(),
        isSatisfied: i % 6 === 0 ? true : false,
        isAnonym: i % 7 === 0 ? true : false,
      },
      comments: null,
      isReported: false,
    };
    stories.push(story);
  }
  return stories;
}
// binding stories to the right user
async function bindingStoriesToUser(storiesDB) {
  for (let i = 0; i < storiesDB.length; i++) {
    let user = await User.findByIdAndUpdate(
      storiesDB[i].writter,
      {
        $push: {
          stories: {
            $each: [storiesDB[i]._id],
            $position: 0,
          },
        },
      },
      { new: true }
    );
    // let userStories = user.stories;

    // console.log('user trouvé par la story.writter : ', user);
    // console.log('les stories de user : ', userStories);
  }
}
//
async function seedDB() {
  try {
    await Professional.deleteMany();
    await User.deleteMany();
    await Story.deleteMany();
    //
    const professionals = generateFakeProfessionals(30);
    const professionalsDB = await Professional.create(professionals);
    themesFromDB = await Theme.find();
    const users = generateFakeUsers(100, themesFromDB);
    const usersDB = await User.create(users);
    //
    const stories = generateFakeStories(
      400,
      usersDB,
      themesFromDB,
      professionalsDB
    );
    const storiesDB = await Story.create(stories);
    //
    const binding = await bindingStoriesToUser(storiesDB);
  } catch (error) {
    console.log(`An error occurred while creating users from the DB: ${error}`);
  }
}
