const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const StickyNote = sequelize.define('StickyNote', {
  note: { type: DataTypes.TEXT, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  isDone: { type: DataTypes.BOOLEAN, allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  
});

module.exports = StickyNote;
