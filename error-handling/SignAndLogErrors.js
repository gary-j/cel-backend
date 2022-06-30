module.exports.SignAndLogErrors = (
  errMessage,
  email = '',
  username = '',
  password = '',
  lastname = '',
  firstname = '',
  dateOfBirth = ''
) => {
  console.log('USER INPUT', username, email);

  let errors = {
    username: '',
    email: '',
    password: '',
    message: '',
    lastname: '',
    firstname: '',
  };

  if (errMessage === 'none') {
    console.log('***Sign and log error NONE password *** : ', password);
    if (password === '') {
      errors.input = 'password';
    } else if (email === '') {
      errors.input = 'email';
    } else if (username === '') {
      errors.input = 'username';
    } else if (lastname === '') {
      errors.input = 'lastname';
    } else if (firstname === '') {
      errors.input = 'firstname';
    } else if (dateOfBirth === '') {
      errors.input = 'dateOfBirth';
    }
    errors.message = `Merci de fournir un ${errors.input}`;
    errors.username = username;
    errors.email = email;
    errors.lastname = lastname;
    errors.firstname = firstname;
  }
  if (errMessage === 'whiteSpace') {
    if (password.includes(' ')) {
      errors.input = 'password';
    } else if (email.includes(' ')) {
      errors.input = 'email';
    } else if (username.includes(' ')) {
      errors.input = 'username';
    }
    errors.message = `${errors.input} Ne peut pas contenir d'espace`;
    errors.username = username;
    errors.email = email;
  }
  if (errMessage === 'email') {
    errors.message = ` "${email}" n'est pas une adresse e-mail valide.`;
    errors.username = username;
    errors.email = email;
    errors.input = 'email';
  }

  if (errMessage === 'password') {
    errors.message = 'Le mot de passe doit contenir au moins 6 caractères';
    errors.input = 'password';
  }

  if (errMessage === 'existEmail') {
    errors.message = `Cette adresse email est déjà utilisée. ("${email}") `;
    errors.email = email;
    errors.input = 'email';
  }

  if (errMessage === 'existUsername') {
    errors.message = `("${username}") est déjà pris`;
    errors.username = username;
    errors.input = 'username';
  }

  if (errMessage === 'notFound') {
    errors.message = ` No user registered with this email address ("${email}") `;
    errors.email = email;
    errors.input = 'email';
  }

  if (errMessage === 'wrong') {
    errors.message =
      'Wrong credentials, please check email address and password';
    errors.email = email;
  }

  //   if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
  //     errors.pseudo = "Ce pseudo est déjà pris";

  //   if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
  //     errors.email = "Cet email est déjà enregistré";
  return errors;
};
