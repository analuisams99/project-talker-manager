const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { q } = req.query;

  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((response) => JSON.parse(response));

  const searchTalkerList = talkers.filter((talker) => talker.name.includes(q));

  if (!q) return res.status(200).json(talkers);
  res.status(200).json(searchTalkerList);
};
