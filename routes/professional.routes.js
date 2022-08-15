const router = require('express').Router();
const professionalController = require('../controllers/professionnalController');
//
router.get('/', professionalController.professionals_get);

module.exports = router;
