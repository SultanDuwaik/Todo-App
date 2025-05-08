const express = require('express');
const { StickyNote, User } = require('../models');
const router = express.Router();

// Create a new sticky note
router.post('/sticky-notes', async (req, res) => {
  try {
    const { userId, note, color, isDone } = req.body;

    // Ensure user exists before creating a sticky note
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stickyNote = await StickyNote.create({ userId, note, color, isDone });
    res.status(201).json(stickyNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sticky notes
router.get('/sticky-notes', async (req, res) => {
  try {
    const stickyNotes = await StickyNote.findAll({ include: User });
    res.json(stickyNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single sticky note by ID
router.get('/sticky-notes/:id', async (req, res) => {
  try {
    const stickyNote = await StickyNote.findByPk(req.params.id, { include: User });
    if (stickyNote) {
      res.json(stickyNote);
    } else {
      res.status(404).json({ error: 'Sticky note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing sticky note by ID
router.put('/sticky-notes/:id', async (req, res) => {
  try {
    const stickyNote = await StickyNote.findByPk(req.params.id);
    if (stickyNote) {
      await stickyNote.update(req.body);
      res.json(stickyNote);
    } else {
      res.status(404).json({ error: 'Sticky note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a sticky note by ID
router.delete('/sticky-notes/:id', async (req, res) => {
  try {
    const stickyNote = await StickyNote.findByPk(req.params.id);
    if (stickyNote) {
      await stickyNote.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Sticky note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sticky notes for a specific user
router.get('/users/:userId/sticky-notes', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stickyNotes = await StickyNote.findAll({ where: { userId: req.params.userId } });
    res.json(stickyNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
