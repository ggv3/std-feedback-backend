const Sequelize = require('sequelize');
const Feedback = require('../model/Feedback');

require('dotenv').config();

const initDatabase = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      dialect: process.env.DB_DIALECT,
    },
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  Feedback.init(
    {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
      },
      text: { type: Sequelize.TEXT, field: 'text', allowNull: false },
      read: { type: Sequelize.BOOLEAN, field: 'read', defaultValue: false },
    },
    { sequelize, modelName: 'feedback' },
  );
  Feedback.sync({ force: true });
};

exports.initDatabase = initDatabase;
