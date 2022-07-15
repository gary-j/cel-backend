const MONGO_URI = process.env.MONGODB_URI || '';
const MONGO_URI_DEV = process.env.MONGODB_URI_DEV;
const PORT = process.env.PORT || 5005;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
  MONGO_URI,
  MONGO_URI_DEV,
  PORT,
  TOKEN_SECRET,
};
