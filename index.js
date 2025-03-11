require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./utilities/connection");
const ObjectId = require('mongodb').ObjectId; 

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

app.post('/get-salesforce-response',authenticateApiKey, async (req, res) => {
    const collection = await connection.getData();
    let data = await collection.create(req.body);
    if(data){
        res.json(
            {
                "status": 200,
                "data": "Data received successfully"
            }
        );
    }
    else{
        res.json(
            {
                "status": 400,
                "data": "Data not received"
            }
        );
    }
});

app.get('/get-salesforce-data',authenticateApiKey, async (req, res) => {
    const collection = await connection.getData();
    let data = await collection.find({},{_id:0,__v:0});
    if(data.length > 0){
        res.json(
            {
                "status": 200,
                "data": data
            }
        );
    }
    else{
        res.json(
            {
                "status": 204,
                "data": "No Data found"
            }
        );
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});