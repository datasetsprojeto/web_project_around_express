require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// Conectar ao MongoDB antes de iniciar o app
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

const { PORT = 3000 } = process.env;
const app = express();

// Middleware para logs de requisição
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());

// Middleware de usuário mock
app.use((req, res, next) => {
  req.user = {
    _id: '686c18774a648e9d913a83f3'
  };
  next();
});

// Rotas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso requisitado não encontrado' });
});

// Tratamento centralizado de erros
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Tratamento de erros específicos do Mongoose
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'Recurso não encontrado' });
  }

  res.status(500).send({ message: 'Ocorreu um erro no servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
.on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
});