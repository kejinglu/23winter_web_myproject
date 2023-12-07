const express = require('express');
const crypto = require('crypto');
const { pool } = require('../mysql'); // Import your MySQL connection

const router = express.Router();

// Get all users
router.get('/getAll', async (req, res, next) => {
  try {
    pool.query('SELECT * FROM users', (err, result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error during retrieving users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// searchContent
router.get('/searchContent', async (req, res, next) => {
  try {
    const { query } = req.query;
    pool.query(`SELECT * FROM posts where content like '%${query}%'`, (err, result) => {
      res.status(200).json({ message: 'success', data: result });
    });
  } catch (error) {
    console.error('Error during retrieving users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// searchUserPost
router.get('/searchUserPost', async (req, res, next) => {
  try {
    const { user_id } = req.query;
    pool.query(`SELECT * FROM posts where user_id = ${user_id}`, (err, result) => {
      res.status(200).json({ message: 'success', data: result });
    });
  } catch (error) {
    console.error('Error during retrieving users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Post the least and post the most
router.get('/searchPostsRank', async (req, res, next) => {
  try {
    pool.query(`
    (
    SELECT user_id, COUNT(*) AS post_count
    FROM posts
    GROUP BY user_id
    ORDER BY post_count DESC
    LIMIT 1
)
UNION
(
    SELECT user_id, COUNT(*) AS post_count
    FROM posts
    GROUP BY user_id
    ORDER BY post_count ASC
    LIMIT 1
)
`, (err, result) => {

      res.status(200).json({ message: 'success', data: result });
    });
  } catch (error) {
    console.error('Error during retrieving users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Post the least and post the most
router.get('/searchCommentsRank', async (req, res, next) => {
  try {
    pool.query(`
    (
    SELECT user_id, COUNT(*) AS comments_count
    FROM comments
    GROUP BY user_id
    ORDER BY comments_count DESC
    LIMIT 1
)
UNION
(
    SELECT user_id, COUNT(*) AS comments_count
    FROM comments
    GROUP BY user_id
    ORDER BY comments_count ASC
    LIMIT 1
)
`, (err, result) => {
      res.status(200).json({ message: 'success', data: result });
    });
  } catch (error) {
    console.error('Error during retrieving users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    return pool.getConnection(async (err, connection) => {
      if (err) {
        next(false)
      }
      const { username, nickname, password } = req.body;

      // Check if the username or nickname is already taken
      connection.query(`SELECT * FROM users WHERE username = '${username}' OR nickname = '${nickname}'`, async (err, result) => {
        if (result.length > 0) {
          return res.status(400).json({ message: 'Username or nickname already exists' });
        }

        // Hash the password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        // Insert a new user into the users table
        await connection.query('INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)', [username, nickname, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
      });


    })


  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    return pool.getConnection(async (err, connection) => {
      // Find the user by username in the users table
      connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (result.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        const user = result[0]
        // Check the password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        if (hashedPassword !== user.password) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        const { user_id } = result[0]
        connection.query(`SELECT user_id, COUNT(*) AS post_count FROM posts WHERE user_id = ${user_id} GROUP BY user_id`, (errRank, resultRank) => {
          let grade = 'beginner'
          if (resultRank.length > 0) {
            const { post_count } = resultRank[0]
            console.log(post_count)
            switch (true) {
              case post_count <= 1:
                grade = 'beginner'
                break;
              case post_count === 2:
                grade = 'Intermediate scholar'
                break;
              case post_count > 3 && post_count <= 5:
                grade = 'expert'
                break;
              default :
                grade = 'Senior expert'
            }
          }
          const data = {
            ...result[0],
            grade
          }
          res.status(200).json({ message: 'Login successful', data });
        })
      });
    })

  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const { user_id } = req.body;
    await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error during User deletion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
