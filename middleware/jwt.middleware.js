const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SECRET;

const isAuthenticated = (req, res, next) => {
  console.log('  *** isAuthenticate /verify ***');

  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!req.headers.authorization) {
      console.log('  *** isAuthenticate : pas de token/user dans headers ***');
      res
        .status(401)
        .json({ authenticated: false, message: 'error, aucun token/user' });
    }
    if (token) {
      console.log('*** LE TOKEN à vérifier *** : ', token);
      // 1. VERIFIER LA TOKEN BLACKLIST EN DB
      // if blacklistedToken === token
      // decoded.authenticated = false;
      // res.json({ authenticated: false, data: 'error , unauthorized' });
      //
      // 2.
      jwt.verify(token, SECRET, function (error, decoded) {
        //
        console.log('*** jwt.verify ***');
        //
        if (error?.name === 'TokenExpiredError' || error !== null) {
          console.log('*** Il y a une erreur *** : ', error);
          res
            .status(401)
            .json({ authenticated: false, message: 'Token invalide' });
        }
        if (decoded) {
          console.log('decoded ! : ', decoded);

          // 2. J'ajoute la clé 'authenticated':true
          // j'ai déjà vérifier en DB la token blacklist

          decoded.authenticated = true;
          // delete decoded.isAdmin;
          // delete decoded.email;
          delete decoded.iat;
          delete decoded.exp;

          // 3. J'ajoute l'objet decoded à la requete
          // pour y avoir acces dans la route suivante - 'Next()'

          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Oops something get wrong, try again !' });
  }
};

const isNotAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!req.headers.authorization) {
      // console.log("pas de token", token);
      next();
    }
    if (token) {
      // console.log("YA UN TOKEN ", token);
      jwt.verify(token, SECRET, function (error, decoded) {
        console.log(error, 'error jwt');
        if (error?.name === 'TokenExpiredError' || error) {
          next();
        }
        if (decoded) {
          res.status(307).json({ message: 'Already logged in, (redirected)' });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Oops something get wrong, try again !' });
  }
};

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
};
