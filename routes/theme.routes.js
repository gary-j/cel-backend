const router = require('express').Router();
const themeController = require('../controllers/themeController');
router.get('/all', themeController.theme_get);
router.get('/:idOrSlug', themeController.one_theme_get);

module.exports = router;
