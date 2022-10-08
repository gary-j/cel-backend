const router = require('express').Router();
const bodyPartController = require('../controllers/bodyPartController');
//
router.get('/', bodyPartController.bodyparts_get);

module.exports = router;
