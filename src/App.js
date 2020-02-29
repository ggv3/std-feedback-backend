const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/Database');
const rateLimit = require('express-rate-limit');
const FeedbackController = require('./controller/FeedbackController');
require('dotenv').config();
db.initDatabase();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 100 requests per windowMs
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
    'X-Requested-With,content-type',
  );

  // Pass to next layer of middleware
  next();
});

app.use('/feedbacks', FeedbackController);

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);
