const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O campo "name" é obrigatório'],
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O nome deve ter no máximo 30 caracteres'],
  },
  about: {
    type: String,
    required: [true, 'O campo "about" é obrigatório'],
    minlength: [2, 'A descrição deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'A descrição deve ter no máximo 30 caracteres'],
  },
  avatar: {
    type: String,
    required: [true, 'O campo "avatar" é obrigatório'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?/i.test(v),
      message: 'O campo "avatar" deve ser uma URL válida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);