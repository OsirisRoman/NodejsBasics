const { Sequelize } = require('sequelize');

const user = 'postgres',
  host = 'localhost',
  database = 'node-complete',
  password = 'postgres',
  port = 5432;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
