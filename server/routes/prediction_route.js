var express = require("express");
var router = express.Router();
var Prediction = require("../models/prediction");


// Create a new prediction
router.post('/api/predictions', async (req, res) => {
    try {
        const newPrediction = new Prediction(req.body);
        await newPrediction.save();
        res.status(200).json({
            message: 'Prediction created successfully',
            data: newPrediction
        });
    } catch (error) {
        console.error('Error creating prediction:', error);
        res.status(500).json({
            message: 'Error creating prediction',
            error: error.message
        });
    }
});


// Get all predictions
router.get('/api/predictions', async (req, res) => {
    try {
        const predictions = await Prediction.find();
        res.status(200).json({
            message: 'Predictions retrieved successfully',
            data: predictions
        });
    } catch (error) {
        console.error('Error retrieving predictions:', error);
        res.status(500).json({
            message: 'Error retrieving predictions',
            error: error.message
        });
    }
});


// Update a prediction by ID
router.put('/api/predictions/:id', async (req, res) => {
    try {
        const updatedPrediction = await Prediction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPrediction) {
            return res.status(404).json({
                message: 'Prediction not found'
            });
        }
        res.status(200).json({
            message: 'Prediction updated successfully',
            data: updatedPrediction
        });
    } catch (error) {
        console.error('Error updating prediction:', error);
        res.status(500).json({
            message: 'Error updating prediction',
            error: error.message
        });
    }
});



// Delete a prediction by ID
router.delete('/api/predictions/:id', async (req, res) => {
    try {
        const deletedPrediction = await Prediction.findByIdAndDelete(req.params.id);
        if (!deletedPrediction) {
            return res.status(404).json({
                message: 'Prediction not found'
            });
        }
        res.status(200).json({
            message: 'Prediction deleted successfully',
            data: deletedPrediction
        });
    } catch (error) {
        console.error('Error deleting prediction:', error);
        res.status(500).json({
            message: 'Error deleting prediction',
            error: error.message
        });
    }
});

module.exports = router;