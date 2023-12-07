'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');


const HOST = '127.0.0.1';
const PORT = 3001;
const UPLOADS_FOLDER = 'uploads';

const users = require('./router/users')
const posts = require('./router/posts')
const channels = require('./router/channels')
const comments = require('./router/comments')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure the 'uploads' folder exists
fs.mkdir(path.join(__dirname, UPLOADS_FOLDER), { recursive: true })
  .then(() => console.log(`'${UPLOADS_FOLDER}' folder created or already exists.`))
  .catch(error => console.error(`Error creating '${UPLOADS_FOLDER}' folder:`, error));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const staticFolderPath = path.join(__dirname, UPLOADS_FOLDER);
app.use('/uploads', express.static(staticFolderPath));

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;

    // Get the original filename from the request
    const originalFilename = req.file.originalname;

    // Extract file extension from the original filename
    const fileExtension = path.extname(originalFilename);

    // Generate a unique ID for the file
    const fileId = uuidv4();

    // Define the file path with the original filename, unique ID, and file extension
    const filePath = path.join(__dirname, UPLOADS_FOLDER, `${fileId}${fileExtension}`);

    // Write the file to the 'uploads' folder
    await fs.writeFile(filePath, fileBuffer);

    // Respond with the unique file ID and original filename
    res.status(200).json({ fileId, filename: `${fileId}${fileExtension}` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.use('/users', users)
app.use('/posts', posts)
app.use('/channels', channels)
app.use('/comments', comments)


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
