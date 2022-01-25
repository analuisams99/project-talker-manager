const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = require('./middlewares/talker');
const talkerId = require('./middlewares/talkerId');
const { loginToken, emailValidation, passwordValidation } = require('./middlewares/login');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', talkerId);
app.get('/talker', talker);
app.post('/login', emailValidation, passwordValidation, loginToken);

app.listen(PORT, () => {
  console.log('Online');
});
