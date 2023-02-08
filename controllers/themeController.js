const router = require('express').Router();
const Theme = require('../models/Theme.model');
const mongoose = require('mongoose');

const theme_get = async (req, res, next) => {
  // console.log('appel ok theme_get');
  try {
    const allthemes = await Theme.find().sort({ name: 1 });

    console.log('les themes trouvés *** : ', allthemes);

    res.status(200).json(allthemes);
  } catch (error) {}
};

// GET Theme By id or slug !

const one_theme_get = async (req, res, next) => {
  const query = req.params.idOrSlug;
  console.log('la query: ', query);
  try {
    if (mongoose.isValidObjectId(query)) {
      console.log('try by id');
      const theme = await Theme.findById(query);
      if (theme === null) {
        const theme = await Theme.findOne({ slug: query });
        res.status(200).json(theme);
        return;
      }
      res.json(theme);
    } else {
      console.log('try by slug');
      const theme = await Theme.findOne({ slug: query });
      res.status(200).json(theme);
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  theme_get,
  one_theme_get,
};
