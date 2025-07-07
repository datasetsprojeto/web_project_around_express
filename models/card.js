const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O campo "name" é obrigatório'],
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O nome deve ter no máximo 30 caracteres'],
  },
  link: {
    type: String,
    required: [true, 'O campo "link" é obrigatório'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?/i.test(v),
      message: 'O campo "link" deve ser uma URL válida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);