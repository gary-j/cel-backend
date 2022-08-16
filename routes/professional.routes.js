const router = require('express').Router();
const professionalController = require('../controllers/professionnalController');
//
router.get('/', professionalController.professionals_get);
router.get(
  '/:userInputValue',
  professionalController.professionalsFiltered_get
);

module.exports = router;
