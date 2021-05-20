const mongoose = require('mongoose');
const db = require('./index');

const schema = new mongoose.Schema({
  name: String,
  board: Array,
  black: Number,
  red: Number,
  turn: String,
  autoJumpRed: Boolean,
  autoJumpBlack: Boolean,
  playerOne: String,
  playerTwo: String,
});

const Board = mongoose.model('Board', schema);

module.exports = Board;