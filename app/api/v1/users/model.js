const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../../../errors');
const { Schema, model } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'organizer', 'owner'],
    default: 'admin'
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'Organizer',
    required: true
  }
}, {
  timestamps: true
});

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

schema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  if (!isMatch) {
    throw new UnauthorizedError('Wrong crendetials');
  }
};

module.exports = model('User', schema);