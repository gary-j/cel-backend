const MONGO_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 5005;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
  MONGO_URI,
  PORT,
  TOKEN_SECRET,
};
