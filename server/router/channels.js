const express = require('express');
const { pool } = require('../mysql');

const router = express.Router();

// Create a new channel
router.post('/create', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Insert a new channel into the channels table
    await pool.query('INSERT INTO channels (name, description) VALUES (?, ?)', [name, description]);

    res.status(201).json({ message: 'Channel created successfully' });
  } catch (error) {
    console.error('Error during channel creation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all channels
router.get('/getAll', async (req, res, next) => {
  try {
    await pool.query('SELECT * FROM channels', (err, result) => {
      res.status(200).json({ message: 'success', data: result });
    });
  } catch (error) {
    console.error('Error during retrieving channels:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get posts by channel ID
router.get('/getType', async (req, res, next) => {
  try {
    const { channels_id } = req.query;
    await pool.query('SELECT * FROM posts WHERE channel_id = ?', [channels_id], (err, result) => {
      res.status(200).json({data:result});
    });

  } catch (error) {
    console.error('Error during retrieving posts by channel ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a channel by ID
router.get('/delete', async (req, res, next) => {
  try {
    const { channels_id } = req.query;

    // Delete related posts before deleting the channel
    await pool.query('DELETE FROM posts WHERE channel_id = ?', [channels_id]);

    // Delete the channel
    await pool.query('DELETE FROM channels WHERE channel_id = ?', [channels_id]);

    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Error during channel deletion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
