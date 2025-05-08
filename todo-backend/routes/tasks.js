// routes/tasks.js
const express = require('express');
const { Task } = require('../models');
const authenticateUser = require('../middleware/authenticateUser'); // Import the middleware
const { Op } = require('sequelize');

const router = express.Router();

router.post('/tasks', authenticateUser, async (req, res) => {
  try {
    const taskData = { ...req.body, userId: req.userId }; // Attach userId from middleware
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tasks', authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId }, // Filter tasks by userId
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other routes using authenticateUser middleware...
module.exports = router;
