const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { id } = req.params;
  
  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((response) => JSON.parse(response));

  const findId = talkers.findIndex((talker) => talker.id === +id);

  talkers.splice(findId, 1);

  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  res.status(204).end();
};
