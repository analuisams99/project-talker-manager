const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  const NUM_VALIDATION = 16;  

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== NUM_VALIDATION) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const MIN_NAME = 3;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < MIN_NAME) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  const MIN_AGE = 18;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (+age < MIN_AGE) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const dateValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  const REGEX_DATE = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const verifyDate = REGEX_DATE.test(watchedAt);

  if (!verifyDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
   
  const MIN_RATE = 1;
  const MAX_RATE = 5;

  if (+rate < MIN_RATE || +rate > MAX_RATE) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
 
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
};
