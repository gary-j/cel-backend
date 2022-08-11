const router = require('express').Router();
const Theme = require('../models/Theme.model');

const theme_get = async (req, res, next) => {
  // console.log('appel ok theme_get');
  try {
    const allthemes = await Theme.find().sort({ name: 1 });

    console.log('les themes trouvés *** : ', allthemes);

    res.status(200).json(allthemes);
  } catch (error) {}
};

module.exports = {
  theme_get,
};
