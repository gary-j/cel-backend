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
  try {
    console.log('Create Story Post Route ok !');
    const storyToCreate = req.body;
    //
    const createdStory = await Story.create(storyToCreate);
    console.log('la story créée en bdd : ', createdStory);
    //
    if (storyToCreate.ressourceToCreate) {
      const ressourceToCreate = {
        ...storyToCreate.ressourceToCreate,
        relatedStory: createdStory._id,
        theme: createdStory.theme,
      };
      const createdRessource = await Ressource.create(ressourceToCreate);
      console.log('created ress : ', createdRessource);
      await Story.findByIdAndUpdate(createdStory._id, {
        ressource: createdRessource._id,
      });
    }
    //
    if (storyToCreate.professionalToCreate !== null) {
      const proToCreate = storyToCreate.professionalToCreate;
      const createdPro = await Professional.create(proToCreate);
      await Story.findByIdAndUpdate(createdStory._id, {
        professionalConsulted: createdPro._id,
      });
    }
    //
    res.status(200).json({ message: 'Votre histoire a bien été postée !' });
  } catch (error) {
    console.log('error story post : ', error);
  }
};

module.exports = {
  stories_get,
  createStory_post,
};
