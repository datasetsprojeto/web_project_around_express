require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { PORT = 3001 } = process.env;
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '634a5d9a9a5d9a5d9a5d9a5d',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso requisitado não encontrado' });
});

app.use((err, req, res) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ocorreu um erro no servidor' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
  .on('error', (err) => {
    console.error('Erro ao iniciar o servidor:', err);
  });
