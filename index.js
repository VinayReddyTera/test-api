const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.post('/get-salesforce-response', (req, res) => {
    console.log(req.body);
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