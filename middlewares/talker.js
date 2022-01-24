const fs = require('fs').promises;

const talker = async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((response) => JSON.parse(response));
  
  res.status(200).json(talkers);
};

module.exports = {
  talker,
};
