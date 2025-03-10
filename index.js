const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
const fs = require('fs');

app.use((req, res, next) => {
  fs.appendFile('log.txt', JSON.stringify(req.body) + '\n\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.post('/get-salesforce-response', (req, res) => {
    res.json(
        {
            "status": 200,
            "data": "Data received successfully"
        }
    );
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});