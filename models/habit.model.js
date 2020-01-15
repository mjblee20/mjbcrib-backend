const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitSchema = new Schema({
  habit: {
    type: String,
    required: true,
  }, 
  type: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
}) 

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;