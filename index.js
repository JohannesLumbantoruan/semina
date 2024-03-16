require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const categoriesRouter = require('./app/api/v1/categories/routes');
const imagesRouter = require('./app/api/v1/images/routes');
const talentsRouter = require('./app/api/v1/talents/routes');
const eventsRouter = require('./app/api/v1/events/routes');
const organizersRouter = require('./app/api/v1/organizers/routes');
const usersRouter = require('./app/api/v1/users/routes');

const errorHandler = require('./app/middlewares/error-handler');
const notFoundRoute = require('./app/middlewares/not-found-route');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/v1/categories', categoriesRouter);
app.use('/v1/images', imagesRouter);
app.use('/v1/talents', talentsRouter);
app.use('/v1/events', eventsRouter);
app.use('/v1/organizers', organizersRouter);
app.use('/v1/users', usersRouter);

app.get('/', (req, res) => {
  return res.send('<h1 style="text-align: center;">Welcome to Semina API</h1>');
});

app.use(errorHandler);
app.use(notFoundRoute);

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