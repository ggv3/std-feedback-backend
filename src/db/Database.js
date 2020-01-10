const Sequelize = require('sequelize');
const Feedback = require('../model/Feedback');
const { config } = require('../config');

require('dotenv').config();

const initDatabase = () => {
  const sequelize = new Sequelize(
    config.DBNAME,
    config.DBUSERNAME,
    config.DBPASSWORD,
    {
      dialect: config.DBDIALECT,
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
};

exports.initDatabase = initDatabase;
