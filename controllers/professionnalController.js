const router = require('express').Router();
const Professional = require('../models/Professional.model');

const professionals_get = async (req, res, next) => {
  try {
    const professionals = await Professional.find().sort({ name: 1 });
    console.log('profesh trouvés *** : ', professionals.length);
    res.status(200).json(professionals);
  } catch (error) {
    console.log(error, 'error fetch professionals');
    next(error);
    return;
  }
};

module.exports = {
  professionals_get,
};
