const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((response) => JSON.parse(response));

  const talker = talkers.find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
};
