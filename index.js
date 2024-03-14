require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const categoriesRouter = require('./app/api/v1/categories/routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/v1/categories', categoriesRouter);

app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center;">Welcome to Semina API</h1>');
});

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to mongodb');

    app.listen(process.env.PORT || 3000, () => {
      console.log(`App running on http://localhost:${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.log(error);
    console.log('Failed connected to mongodb');
  }
}

init();