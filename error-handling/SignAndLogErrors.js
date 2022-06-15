module.exports.SignAndLogErrors = (
  errMessage,
  email = '',
  username = '',
  password = ''
) => {
  console.log('USER INPUT', username, email);

  let errors = { username: '', email: '', password: '', message: '' };

  if (errMessage === 'none') {
    console.log('***Sign and log error NONE password *** : ', password);
    if (password === '') {
      errors.input = 'password';
    } else if (email === '') {
      errors.input = 'email';
    } else if (username === '') {
      errors.input = 'username';
    }
    errors.message = `Merci de fournir un ${errors.input}`;
    errors.username = username;
    errors.email = email;
  }
  if (errMessage === 'whiteSpace') {
    if (password.includes(' ')) {
      errors.input = 'password';
    } else if (email.includes(' ')) {
      errors.input = 'email';
    } else if (username.includes(' ')) {
      errors.input = 'username';
    }
    errors.message = `${errors.input} can not contains white space`;
    errors.username = username;
    errors.email = email;
  }
  if (errMessage === 'email') {
    errors.message = ` "${email}" is not a valid email address.`;
    errors.username = username;
    errors.email = email;
    errors.input = 'email';
  }

  if (errMessage === 'password') {
    errors.message = 'Password must have at least 6 characters.';
    errors.input = 'password';
  }

  if (errMessage === 'existEmail') {
    errors.message = ` User with this email address already exist. ("${email}") `;
    errors.email = email;
    errors.input = 'email';
  }

  if (errMessage === 'existUsername') {
    errors.message = ` User with this username already exist. ("${username}") `;
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
