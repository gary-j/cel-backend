const router = require('express').Router();
const storyController = require('../controllers/storyController');
//
router.get('/', storyController.stories_get);
router.post('/create', storyController.createStory_post);

module.exports = router;
