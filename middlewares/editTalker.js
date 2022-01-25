const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((response) => JSON.parse(response));

  const findId = talkers.findIndex((talker) => talker.id === +id);

  talkers[findId] = { ...talkers[findId], name, age, talk };
  
  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  res.status(200).json(talkers[findId]);
};
