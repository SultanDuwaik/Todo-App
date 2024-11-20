const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const List = sequelize.define('List', {
  name: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
});

module.exports = List;
