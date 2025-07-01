require('dotenv').config();
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3001 } = process.env;
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
    _id: '634a5d9a9a5d9a5d9a5d9a5d'
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
  res.status(500).send({ message: 'Ocorreu um erro no servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
.on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
});