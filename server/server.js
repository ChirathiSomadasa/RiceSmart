const express = require("express");
const cors = require("cors");  // Import CORS middleware
const bodyParser = require("body-parser");  // Import body-parser middleware
require('dotenv').config();
const dbConfig = require("./config/dbConfig");
const mongoose = require("mongoose");
const ContactModel = require('./models/contact')
const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

const port = process.env.PORT || 5001;

app.listen(port, () => 
    console.log(`Node server started at port ${port}`));


// Import the model
const Prediction = require('./models/prediction');
const Contact = require('./models/contact');

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

 

app.get('/ ', (req, res) => {
    ContactModel.find({})
    .then(contacts => res.json(contacts))
    .catch(err => res.status(500).json({err:err.message}));
 })
/*
app.get('/getContact/:id',(req,res) => {
    const id = req.params.id;
    ContactModel.findById({id})
    .then(contacts => res.json(contacts))
    .catch(err => res.status(500).json({err:err.message}))
})

app.put('/UpdateContact/:id',(req,res) => {
    const id = req.params.id;
    ContactModel.findByIdAndUpdate({_id: id}, {
        disease: req.body.disease,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location
    })
    .then(contacts => res.json(contacts))
    .catch(err => res.status(500).json({err:err.message}))
})

app.delete('/deleteContact/:id',(req,res) =>{
    const id = req.params.id;
    ContactModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.status(500).json({err:err.message}))
})
*/
app.post("/AddProblem",async(req,res) => {
    try {
        const newProblem = new ContactModel(req.body);
        await newProblem.save();
        res.status(200).json({ message: 'Problem added successfully!', data: newProblem });
    } catch (err) {
        res.status(500).json({ error: 'Error adding problem' });
    }

    /*
    const contact = req.body;
    const newContact = new ContactModel(contact);
    await newContact.save();
    res.json(contact);
    */
});


// Fetch all problems
app.get("/", async (req, res) => {
    try {
        const problems = await ContactModel.find({});
        res.status(200).json(problems);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching problems' });
    }
});

// Update a problem
app.put("/UpdateContact/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProblem = await ContactModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProblem);
    } catch (err) {
        res.status(500).json({ error: 'Error updating problem' });
    }
});

// Delete a problem
app.delete("/deleteContact/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await ContactModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting problem' });
    }
});

app.get('/getContact/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await ContactModel.findById(id);
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching problem' });
    }
});
