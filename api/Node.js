const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let receivedData = [];

// Use CORS middleware with options
app.use(cors({
    origin: 'https://aurdino-control-frontend.vercel.app', // Replace with your actual frontend domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(bodyParser.json());

// Endpoint to receive data from the Android app
app.post('/data', (req, res) => {
    const { data } = req.body;
    if (data) {
        receivedData.push(data);
        console.log('Data received:', data);
        res.status(200).send('Data received successfully');
    } else {
        console.log('No data received in request body.');
        res.status(400).send('No data received');
    }
});

// Endpoint to retrieve data for the frontend
app.get('/data', (req, res) => {
    res.json({ data: receivedData });
});

// Export the Express app for Vercel to handle
module.exports = app;
