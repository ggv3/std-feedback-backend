const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/Database');
const { config } = require('./config');

const FeedbackController = require('./controller/FeedbackController');

db.initDatabase();

const app = express();
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

app.listen(config.PORT, () =>
  console.log(`App listening on port ${config.PORT}!`),
);
