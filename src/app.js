import express from 'express';
import Knex from 'knex';
import knexfile from '../knexfile';
import FeedbackController from './controller/FeedbackController';
import TwitchUserController from './controller/TwitchUserController';

const knex = Knex(knexfile);

const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.set('trust proxy', 1);

app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    // eslint-disable-next-line comma-dangle
    'X-Requested-With,content-type'
  );

  // Pass to next layer of middleware
  next();
});

app.use('/feedbacks', FeedbackController);
app.use('/twitch-users', TwitchUserController);
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${process.env.PORT}!`);
  knex.migrate.latest();
});
