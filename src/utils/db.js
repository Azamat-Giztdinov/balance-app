const { Sequelize } = require('sequelize');
const UserModel = require('../models/user');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = UserModel(sequelize, Sequelize);

module.exports = { sequelize, User };
