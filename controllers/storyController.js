const router = require('express').Router();
const Story = require('../models/Story.model');
const Professional = require('../models/Professional.model');
const Ressource = require('../models/Ressource.model');
// Ajout du model Professional et le .populate fonctionne pour lui
// mais pour Theme.model et User.model bizarrement ça fonctionne sans import du schema
//
const stories_get = async (req, res, next) => {
  try {
    const stories = await Story.find()
      .populate('writter theme professionalConsulted ressource')
      .sort({ createdAt: -1 })
      .limit(10);
    console.log('stories_get, toutes les stories', stories);
    res.status(200).json(stories);
  } catch (error) {
    console.log(error, 'error fetch stories');
    next(error);
    return;
  }
};

const createStory_post = async (req, res, next) => {
  console.log('Create Story Post Route ok !');
  res.status(200).json({ message: 'Create Story Post Route ok !' });
};

module.exports = {
  stories_get,
  createStory_post,
};
