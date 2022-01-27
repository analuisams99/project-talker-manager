const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middlewares/talker');
const talkerId = require('./middlewares/talkerId');
const { loginToken, emailValidation, passwordValidation } = require('./middlewares/login');
const { 
  tokenValidation, 
  nameValidation,
  ageValidation,
  dateValidation,
  rateValidation,
  talkValidation,
} = require('./middlewares/talkerValidation');
const addTalker = require('./middlewares/addTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', tokenValidation, searchTalker);
app.get('/talker/:id', talkerId);
app.get('/talker', talker);
app.post('/login', emailValidation, passwordValidation, loginToken);
app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
  addTalker,
);
app.put(
  '/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
  editTalker,
);
app.delete('/talker/:id', tokenValidation, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
