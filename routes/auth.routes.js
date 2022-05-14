const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jsonwebtoken = require('jsonwebtoken');
// const User = require('../models/User.model');
// const { SignAndLogErrors } = require('../error-handling/SignAndLogErrors');
const authController = require('../controllers/authController');
//
router.get('/signup', async (req, res, next) => {
  console.log('access to sign up route');
  res.status(200).json({ message: 'access to sign up route' });
});

//
router.post('/signup', authController.signup_post);

module.exports = router;
