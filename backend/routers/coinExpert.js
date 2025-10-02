const router = require('express').Router();
const Coin = require('../models/coin');
const auth = require('../middleware/auth');

router.get('/pending', auth.verifyExpert, async (req, res) => {
  try {
    const coins = await Coin.find({ evaluated: false }).populate('ownerId', 'username email');
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id/evaluate', auth.verifyExpert, async (req, res) => {
  try {
    const { value } = req.body;
    const coin = await Coin.findById(req.params.id);
    if (!coin) return res.status(404).json({ error: 'Coin not found' });
    if (coin.evaluated) return res.status(400).json({ error: 'Coin already evaluated' });

    coin.value = value;
    coin.evaluated = true;
    await coin.save();

    res.json({ message: 'Coin evaluated successfully', coin });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;