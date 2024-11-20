const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./Task');
const Tag = require('./Tag');

const TaskTag = sequelize.define('TaskTag', {
  TaskId: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: 'id',
    },
  },
  TagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
  },
});

module.exports = TaskTag;
