const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname)));


app.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Book Scout server running on http://localhost:${PORT}`);
});

