const express = require("express");
const cors = require("cors");  // Import CORS middleware
const bodyParser = require("body-parser");  // Import body-parser middleware
require('dotenv').config();
const dbConfig = require("./config/dbConfig");

const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Node server started at port ${port}`));


// Import the model
const Prediction = require('./models/prediction');

// POST route to handle form submission
app.post('/api/predictions', async (req, res) => {
    try {
        const newPrediction = new Prediction(req.body);
        await newPrediction.save();
        res.status(200).json({ message: 'Prediction saved successfully!' });
        console.log('Prediction saved successfully:', newPrediction);

    } catch (error) {
        console.error('Error saving prediction:', error); // Log the error
        res.status(500).json({ error: 'Failed to save prediction', details: error.message });
    }

});


app.get('/', (req, res) => {
    res.send('Server is running');
});
