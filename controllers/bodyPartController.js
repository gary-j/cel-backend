const router = require('express').Router();
const BodyPart = require('../models/BodyPart.model');
//
const bodyparts_get = async (req, res, next) => {
  try {
    const bodyParts = await BodyPart.find().sort({ slug: 1 });
    // console.log('les bodyparts : ', bodyParts);
    res.status(200).json(bodyParts);
  } catch (error) {
    console.log(error, 'error fetch body parts');
    next(error);
    return;
  }
};

module.exports = {
  bodyparts_get,
};
