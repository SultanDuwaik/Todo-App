const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./List');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  isDone: { type: DataTypes.BOOLEAN, allowNull: false },
  description: DataTypes.TEXT,
  dueDate: DataTypes.DATE,
  listId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: List,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },

});

module.exports = Task;
