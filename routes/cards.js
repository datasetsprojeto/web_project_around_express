const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(cardsPath, 'utf-8');
    const cards = JSON.parse(data);
    res.send(cards);
  } catch (err) {
    next(err);
  }
});

module.exports = router;