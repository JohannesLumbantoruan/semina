const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
    unique: true
  },
}, { timestamps: true });

module.exports = model('Category', schema);