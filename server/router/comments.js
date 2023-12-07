const express = require('express');
const { pool } = require('../mysql');

const router = express.Router();

// Create a new comment
router.post('/create', async (req, res, next) => {
  try {
    const { content, user_id, post_id, parent_comment_id,img_name } = req.body;

    // Insert a new comment into the comments table
    await pool.query(
      'INSERT INTO comments (content, user_id, post_id, parent_comment_id,img_name) VALUES (?, ?, ?, ?,?)',
      [content, user_id, post_id, parent_comment_id,img_name]
    );

    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    console.error('Error during comment creation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all comments
router.get('/getAll', async (req, res, next) => {
  try {
    pool.query('SELECT * FROM comments', (err, result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error during retrieving comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Get comments by post ID
router.get('/getComment', async (req, res, next) => {
  try {
    const { post_id } = req.query;

    // Retrieve comments and their replies for a specific post
    const comments = await pool.query(
      'SELECT * FROM comments WHERE post_id = ? OR parent_comment_id IN (SELECT comment_id FROM comments WHERE post_id = ?)',
      [post_id, post_id],
      (err, result) => {
        const groupedComments = organizeComments(result);
        res.status(200).json({ data: groupedComments });

        // res.status(200).json({ data: result });
      }
    );

  } catch (error) {
    console.error('Error during retrieving comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Function to organize comments into a hierarchical structure
function organizeComments(comments) {
  const commentMap = new Map();

  // Create a map where each comment is indexed by its comment_id
  comments.forEach(comment => {
    commentMap.set(comment.comment_id, comment);
  });

  const groupedComments = [];

  // Iterate through comments to organize them into a hierarchical structure
  commentMap.forEach(comment => {
    if (!comment.parent_comment_id) {
      // If the comment has no parent, it's a root-level comment
      groupedComments.push(comment);
    } else {
      // If the comment has a parent, add it as a reply to its parent
      const parentComment = commentMap.get(comment.parent_comment_id);
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(comment);
    }
  });

  return groupedComments;
}


// Delete a comment by ID
router.get('/delete', async (req, res, next) => {
  try {
    const { comment_id } = req.query;

    // Delete the comment and its replies
    await pool.query('DELETE FROM comments WHERE comment_id = ? OR parent_comment_id = ?', [comment_id, comment_id]);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error during comment deletion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
