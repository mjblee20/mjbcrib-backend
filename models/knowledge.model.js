const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const knowledgeSchema = new Schema({
  language: {
    type: String,
    required: true,
  }, 
  time: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
}) 

const knowledge = mongoose.model('knowledge', knowledgeSchema);

module.exports = knowledge;