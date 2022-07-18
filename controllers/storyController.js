const router = require('express').Router();
const Story = require('../models/Story.model');
//
const stories_get = async (req, res, next) => {
  const stories = await Story.find().sort({ createdAt: -1 }).limit(10);
  console.log('stories_get, toutes les stories', stories);
  res.status(200).json(stories);
};

module.exports = {
  stories_get,
};
