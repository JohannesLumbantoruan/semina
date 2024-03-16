const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ticketCategoriesSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true
  },
  expired: {
    type: Date
  }
});

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  about: {
    type: String
  },
  tagline: {
    type: String,
    required: true
  },
  keyPoint: {
    type: [String]
  },
  venueName: {
    type: String,
    required: true
  },
  statusEvent: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  tickets: {
    type: [ticketCategoriesSchema],
    required: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  talent: {
    type: Schema.Types.ObjectId,
    ref: 'Talent',
    required: true
  }
}, { timestamps: true });

module.exports = model('Event', schema);