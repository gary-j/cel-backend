const mongoose = require('mongoose');
const User = require('../models/User.model');
const Professional = require('../models/Professional.model');
const Story = require('../models/Story.model');
const { faker } = require('@faker-js/faker');

const dotenv = require('dotenv');
dotenv.config();

const { MONGO_URI } = require('../utils/consts');

mongoose
  .connect(MONGO_URI)
  .then(async (x) => {
    console.log(
      `Connected to Mongo Gary! Database name: '${x.connections[0].name}'`
    );
    // await seedDB();
    await mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });
