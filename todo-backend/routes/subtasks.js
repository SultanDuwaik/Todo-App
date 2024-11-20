const express = require('express');
const { Subtask } = require('../models');
const router = express.Router();

// Create a new subtask
router.post('/subtasks', async (req, res) => {
  try {
    const subtask = await Subtask.create(req.body);
    res.status(201).json(subtask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all subtasks
router.get('/subtasks', async (req, res) => {
  try {
    const subtasks = await Subtask.findAll();
    res.json(subtasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single subtask by ID
router.get('/subtasks/:id', async (req, res) => {
  try {
    const subtask = await Subtask.findByPk(req.params.id);
    if (subtask) {
      res.json(subtask);
    } else {
      res.status(404).json({ error: 'Subtask not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing subtask by ID
router.put('/subtasks/:id', async (req, res) => {
  try {
    const subtask = await Subtask.findByPk(req.params.id);
    if (subtask) {
      await subtask.update(req.body);
      res.json(subtask);
    } else {
      res.status(404).json({ error: 'Subtask not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a subtask by ID
router.delete('/subtasks/:id', async (req, res) => {
  try {
    const subtask = await Subtask.findByPk(req.params.id);
    if (subtask) {
      await subtask.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Subtask not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all subtasks for a specific taskId
router.get('/tasks/:taskId/subtasks', async (req, res) => {
  try {
    const subtasks = await Subtask.findAll({
      where: { taskId: req.params.taskId }
    });
    res.json(subtasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
