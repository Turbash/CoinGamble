const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Coin = require('../models/coin');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.post('/', auth.verifyCollector, upload.single('photo'), async (req, res) => {
  try {
    const { name, year, country, description } = req.body;
    const coin = new Coin({
      name,
      year,
      country,
      description,
      photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      ownerId: req.user.id
    });

    await coin.save();
    res.status(201).json({ message: 'Coin uploaded successfully', coin });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', err });
  }
});

router.get('/', auth.verifyCollector, async (req, res) => {
  try {
    const coins = await Coin.find({ ownerId: req.user.id });
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', auth.verifyCollector, async (req, res) => {
  try {
    const coin = await Coin.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!coin) return res.status(404).json({ error: 'Coin not found' });
    res.json(coin);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id', auth.verifyCollector, async (req, res) => {
  try {
    const coin = await Coin.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!coin) return res.status(404).json({ error: 'Coin not found' });
    if (coin.evaluated) return res.status(400).json({ error: 'Cannot edit evaluated coin' });

    const { name, year, description } = req.body;
    if (name) coin.name = name;
    if (year) coin.year = year;
    if (description) coin.description = description;

    await coin.save();
    res.json({ message: 'Coin updated successfully', coin });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', auth.verifyCollector, async (req, res) => {
  try {
    const coin = await Coin.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!coin) return res.status(404).json({ error: 'Coin not found' });
    if (coin.evaluated) return res.status(400).json({ error: 'Cannot delete evaluated coin' });

    await coin.remove();
    res.json({ message: 'Coin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/value/total', auth.verifyCollector, async (req, res) => {
  try {
    const coins = await Coin.find({ ownerId: req.user.id, evaluated: true });
    const total = coins.reduce((sum, c) => sum + (c.value || 0), 0);
    res.json({ totalValue: total });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;