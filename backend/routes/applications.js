const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Listing = require('../models/Listing');

// Create a new application
router.post('/', async (req, res) => {
    try {
        const applicationData = req.body;
        const newApplication = new Application(applicationData);
        await newApplication.save();

        // Increment applicant count in the listing
        if (applicationData.jobId) {
            await Listing.findByIdAndUpdate(applicationData.jobId, { $inc: { applicants: 1 } });
        }

        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all applications
router.get('/', async (req, res) => {
    try {
        const { email } = req.query;
        let query = {};
        if (email) {
            query.email = email;
        }
        const applications = await Application.find(query).sort({ applied: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific application
router.get('/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ error: 'Application not found' });
        res.json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update application status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!application) return res.status(404).json({ error: 'Application not found' });
        res.json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
