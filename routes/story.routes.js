const router = require('express').Router();
const storyController = require('../controllers/storyController');
//
router.get('/', storyController.stories_get);

module.exports = router;
