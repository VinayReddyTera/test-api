require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

// Middleware to validate API key
const authenticateApiKey = (req, res, next) => {
    const providedApiKey = req.headers['x-api-key']; // Get API key from request headers

    if (!providedApiKey) {
        return res.status(401).json({ status: 401, error: 'API key is missing' });
    }

    if (providedApiKey !== API_KEY) {
        return res.status(403).json({ status: 403, error: 'Invalid API key' });
    }

    next(); // Proceed if API key is valid
};

app.use((req, res, next) => {
  fs.appendFile('log.txt', JSON.stringify(req.body) + '\n\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.post('/get-salesforce-response',authenticateApiKey, (req, res) => {
    console.log(req.body);
    res.json(
        {
            "status": 200,
            "data": "Data received successfully"
        }
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});