const express = require('express');
const { pool } = require('../mysql');

const router = express.Router();

// Create a new post
router.post('/create', async (req, res, next) => {
  try {
    const { user_id, channel_id, title, img_name, content } = req.body;

    // Insert a new post into the posts table
    await pool.query('INSERT INTO posts (user_id, channel_id, title, img_name, content) VALUES (?, ?, ?, ?, ?)', [user_id, channel_id, title, img_name, content]);

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error during post creation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all posts
router.get('/getAll', async (req, res, next) => {
  try {
    pool.query('SELECT * FROM posts', (err, result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error during retrieving posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Search posts by title
router.get('/search', async (req, res, next) => {
  try {
    const { title } = req.query;
    pool.query('SELECT * FROM posts WHERE title LIKE ?', [`%${title}%`], (err, result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error during post search:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a post by ID
router.get('/byID', async (req, res, next) => {
  try {
    const { post_id } = req.query;
    pool.query('SELECT * FROM posts WHERE post_id = ?', [post_id], (err, result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: 'Post not found', data: [] });
      }

      res.status(200).json(result[0]);
    });


  } catch (error) {
    console.error('Error during retrieving post by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a post by ID
router.get('/delete', async (req, res, next) => {
  try {
    const { post_id } = req.query;
    await pool.query('DELETE FROM posts WHERE post_id = ?', [post_id]);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error during post deletion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Like a post
router.post('/like', async (req, res, next) => {
  try {
    const { post_id } = req.body;

    // Update the likes count for the specified post
    await pool.query('UPDATE posts SET likes = likes + 1 WHERE post_id = ?', [post_id]);

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error during post liking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Dislike a post
router.post('/dislike', async (req, res, next) => {
  try {
    const { post_id } = req.body;

    // Update the dislikes count for the specified post
    await pool.query('UPDATE posts SET dislikes = dislikes + 1 WHERE post_id = ?', [post_id]);

    res.status(200).json({ message: 'Post disliked successfully' });
  } catch (error) {
    console.error('Error during post disliking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
