const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User.model');
const { SignAndLogErrors } = require('../error-handling/SignAndLogErrors');

const signup_get = async (req, res, next) => {
  console.log('access to sign up route');
  res.status(200).json({ message: 'access to sign up route' });
};
//
const signup_post = async (req, res, next) => {
  try {
    const {
      lastname,
      firstname,
      username,
      email,
      password,
      dateOfBirth,
      selectedThemes,
    } = req.body;

    // Check if email or password or name are provided as empty string

    if (email === '' || username === '' || password === '') {
      const error = SignAndLogErrors('none', email, username);
      res.status(406).json(error);

      return;
    }

    // Check if email or password or username contains whitespace \s

    if (
      email.includes(' ') ||
      password.includes(' ') ||
      username.includes(' ')
    ) {
      const error = SignAndLogErrors('whiteSpace', email, username);
      res.status(406).json(error);
      return;
    }
    // Use regex to validate the email format

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      const error = SignAndLogErrors('email', email, username);
      res.status(406).json(error);
      return;
    }

    const passwordRegex = /.{6,}/;
    if (!passwordRegex.test(password)) {
      const error = SignAndLogErrors('password');
      res.status(406).json(error);
      return;
    }

    // const foundUser = await User.findOne({ email });

    const foundUser = await User.find({
      // résultat = renvoi un tableau d'object
      $or: [{ email: email }, { username: username }],
    });

    if (foundUser.length > 0) {
      console.log(foundUser, ': user found');
      if (foundUser[0].email === email) {
        const error = SignAndLogErrors('existEmail', email, '');
        res.status(406).json(error);
        return;
      } else if (foundUser[0].username === username) {
        const error = SignAndLogErrors('existUsername', '', username);
        res.status(406).json(error);
        return;
      } else {
        res
          .status(500)
          .json({ message: 'Une erreur est survenue. Merci de réessayer.' });
        return;
      }
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      lastname,
      firstname,
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
      selectedThemes,
    });

    if (!createdUser) {
      res.status(406).json({
        message:
          'Enregistrement en base de donnée impossible, vérifier tous les champs',
      });
    }
    console.log(createdUser, 'new user');

    const payload = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    };

    const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });

    res
      .status(201)
      .json({ authToken: authToken, message: 'Welcome ! You Signed up.' });
  } catch (error) {
    console.log(': validator : ', error._message);
    if (error._message === 'User validation failed') {
      res.status(406).json({
        message:
          'Enregistrement impossible en base de données, vérifiez que vos données respectent les modèles de schemas',
      });
    } else {
      console.log(error, 'error au sign up');
      next(error);
      return;
    }
  }
};

module.exports = { signup_post, signup_get };
