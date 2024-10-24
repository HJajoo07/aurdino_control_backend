const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let receivedData = []; // Array to store up to 10 readings

// Middleware
app.use(bodyParser.json());

// Endpoint to receive data from the Android app
app.post('/data', (req, res) => {
    const { data } = req.body;
    if (data) {
        receivedData.push(data); // Add new data to the array

        // Ensure the array only keeps the latest 10 readings
        if (receivedData.length > 10) {
            receivedData.shift(); // Remove the oldest data when the array exceeds 10 elements
        }

        console.log('Data received:', data);
        res.status(200).send('Data received successfully');
    } else {
        console.log('No data received in request body.');
        res.status(400).send('No data received');
    }
});

// Endpoint to retrieve the latest 10 data readings for the frontend
app.get('/data', (req, res) => {
    res.json({ data: receivedData }); // Return the array of the latest 10 readings
});

// Export the Express app for Vercel to handle
module.exports = app;

// Vercel handles listening, so do not call app.listen
