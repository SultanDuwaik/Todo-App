const express = require('express');
const { List } = require('../models');
const router = express.Router();

// Create a new list
router.post('/lists', async (req, res) => {
  try {
    const list = await List.create(req.body);
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all lists
router.get('/lists', async (req, res) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single list by ID
router.get('/lists/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (list) {
      res.json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing list by ID
router.put('/lists/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (list) {
      await list.update(req.body);
      res.json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a list by ID
router.delete('/lists/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (list) {
      await list.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
