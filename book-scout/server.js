const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.listen(PORT, () => {
  console.log(`Book Scout server running on http://localhost:${PORT}`);
});

