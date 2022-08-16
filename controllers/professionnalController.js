const router = require('express').Router();
const Professional = require('../models/Professional.model');

const professionals_get = async (req, res, next) => {
  try {
    const professionals = await Professional.find().sort({ name: 1 }).limit(20);
    console.log('profesh trouvés *** : ', professionals.length);
    res.status(200).json(professionals);
  } catch (error) {
    console.log(error, 'error fetch professionals');
    next(error);
    return;
  }
};
//
const professionalsFiltered_get = async (req, res, next) => {
  try {
    const query = req.params.userInputValue;
    const professionals = await Professional.find({
      $or: [
        {
          name: { $regex: query, $options: 'i' },
        },
        {
          firstname: { $regex: query, $options: 'i' },
        },
      ],
    }).sort({ name: 1, firstname: 1 });
    console.log(
      'profesh filtrés trouvés avec : ',
      query,
      ' ',
      professionals.length
    );
    res.status(200).json(professionals);
  } catch (error) {
    console.log(error, 'error fetch professionals');
    next(error);
    return;
  }
};
module.exports = {
  professionals_get,
  professionalsFiltered_get,
};
