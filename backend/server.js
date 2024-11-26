const express = require('express');
const { executeQuery } = require('./db');
const cors = require('cors');


const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/query', async (req, res) => {
  const { query } = req.body;
  try {
    const result = await executeQuery(query);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Query execution failed.' });
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));