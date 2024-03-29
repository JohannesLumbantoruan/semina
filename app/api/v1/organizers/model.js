const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('Organizer', schema);