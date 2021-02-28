const { Sequelize, Datatypes, DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Order = require('./order');

const OrderItem = sequelize.define('orderitem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = OrderItem;
