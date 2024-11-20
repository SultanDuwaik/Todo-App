const express = require('express');
const { Task } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tasks/today', async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Query tasks due today
    const tasks = await Task.findAll({
      where: {
        dueDate: {
          [Op.gte]: startOfToday,
          [Op.lt]: endOfToday,
        },
      },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tasks/upcoming', async (req, res) => {
  try {
    // Get the current date
    const now = new Date();

    // Calculate the start of the week (Sunday at 00:00)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Calculate the end of the week (Saturday at 23:59:59)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Query tasks due this week
    const tasks = await Task.findAll({
      where: {
        dueDate: {
          [Op.gte]: startOfWeek,
          [Op.lte]: endOfWeek,
        },
      },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;