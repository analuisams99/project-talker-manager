const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const REGEX_EMAIL = /\S+@\S+\.\S+/; 

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!REGEX_EMAIL.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  const MIN_PASSWORD = 6;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < MIN_PASSWORD) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const loginToken = (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
};

module.exports = {
  loginToken,
  emailValidation,
  passwordValidation,
};