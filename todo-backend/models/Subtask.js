// models/Subtask.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./Task');

const Subtask = sequelize.define('Subtask', {
  title: { type: DataTypes.STRING, allowNull: false },
  isDone: { type: DataTypes.BOOLEAN, allowNull: false },
  taskId: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

module.exports = Subtask;