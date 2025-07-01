const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.userId);

    if (!user) {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
      return;
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;