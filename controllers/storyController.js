const router = require('express').Router();
const Story = require('../models/Story.model');
const Professional = require('../models/Professional.model');
// Ajout du model Professional et le .populate fonctionne pour lui
// mais pour Theme.model et User.model bizarrement ça fonctionne sans import du schema
//
const stories_get = async (req, res, next) => {
  const stories = await Story.find()
    .populate('writter theme professionalConsulted')
    .sort({ createdAt: -1 });
  // .limit(10);
  console.log('stories_get, toutes les stories', stories);
  res.status(200).json(stories);
};

const createStory_post = async (req, res, next) => {
  console.log('Create Story Post Route ok !');
  res.status(200).json({ message: 'Create Story Post Route ok !' });
};

module.exports = {
  stories_get,
  createStory_post,
};
