const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    default: '-'
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  }
}, { timestamps: true });

module.exports = model('Talent', schema);