const User = require('../models/user');
const { ERROR_CODE, NOT_FOUND_ERROR_CODE, SERVER_ERROR_CODE } = require('../utils/constants');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(SERVER_ERROR_CODE).send({ message: 'Erro ao buscar usuários' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .orFail(() => {
        const error = new Error('Usuário não encontrado');
        error.statusCode = NOT_FOUND_ERROR_CODE;
        throw error;
      });
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE).send({ message: 'ID inválido' });
    }
    if (err.statusCode === NOT_FOUND_ERROR_CODE) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
    }
    res.status(SERVER_ERROR_CODE).send({ message: 'Erro no servidor' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Dados inválidos' });
    }
    res.status(SERVER_ERROR_CODE).send({ message: 'Erro ao criar usuário' });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        const error = new Error('Usuário não encontrado');
        error.statusCode = NOT_FOUND_ERROR_CODE;
        throw error;
      });
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Dados inválidos' });
    }
    if (err.statusCode === NOT_FOUND_ERROR_CODE) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
    }
    res.status(SERVER_ERROR_CODE).send({ message: 'Erro no servidor' });
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        const error = new Error('Usuário não encontrado');
        error.statusCode = NOT_FOUND_ERROR_CODE;
        throw error;
      });
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Dados inválidos' });
    }
    if (err.statusCode === NOT_FOUND_ERROR_CODE) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
    }
    res.status(SERVER_ERROR_CODE).send({ message: 'Erro no servidor' });
  }
};