// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
const dotenv = require('dotenv');
dotenv.config();

const { MONGO_URI, MONGO_URI_DEV } = require('../utils/consts');

const DB_URI = process.env.ENV === 'DEV' ? MONGO_URI_DEV : MONGO_URI;

mongoose
  .connect(DB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });
