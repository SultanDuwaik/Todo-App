const Task = require('./Task');
const List = require('./List');
const Tag = require('./Tag');
const TaskTag = require('./TaskTag');
const Subtask = require('./Subtask');

// One-to-Many: A List has many Tasks, and each Task belongs to a List
Task.belongsTo(List, { foreignKey: 'listId', onDelete: 'CASCADE' });
List.hasMany(Task, { foreignKey: 'listId' });

// Many-to-Many: A Task can have multiple Tags and a Tag can belong to multiple Tasks
Task.belongsToMany(Tag, { through: TaskTag });
Tag.belongsToMany(Task, { through: TaskTag });

// One-to-Many: A Task has many Subtasks, each Subtask belongs to a Task
Task.hasMany(Subtask, { foreignKey: 'taskId', onDelete: 'CASCADE' });
Subtask.belongsTo(Task, { foreignKey: 'taskId', onDelete: 'CASCADE' });

module.exports = { Task, List, Tag, TaskTag, Subtask };
