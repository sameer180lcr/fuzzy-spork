const express = require('express');
const router = express.Router();
const VerificationCompanyDetail = require('../models/VerificationCompanyDetail');

// Submit verification data
router.post('/', async (req, res) => {
    try {
        const { userId, companyData, representatives, verificationChecks } = req.body;

        // Check if user already has a pending verification
        const existingVerification = await VerificationCompanyDetail.findOne({
            userId,
            status: { $in: ['pending', 'in_review'] }
        });

        if (existingVerification) {
            return res.status(400).json({ 
                msg: 'You already have a verification request in progress' 
            });
        }

        // Create new verification request
        const verification = new VerificationCompanyDetail({
            userId,
            companyData,
            representatives,
            verificationChecks
        });

        await verification.save();
        res.json(verification);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Get verification status by user ID
router.get('/status/:userId', async (req, res) => {
    try {
        const verification = await VerificationCompanyDetail.findOne({ 
            userId: req.params.userId 
        }).sort({ submittedAt: -1 });

        if (!verification) {
            return res.status(404).json({ msg: 'No verification request found' });
        }

        res.json(verification);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Get all verification requests (for admin)
router.get('/', async (req, res) => {
    try {
        const verifications = await VerificationCompanyDetail.find()
            .sort({ submittedAt: -1 });
        res.json(verifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Update verification status (for admin)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status, notes, reviewedBy } = req.body;
        
        const verification = await VerificationCompanyDetail.findByIdAndUpdate(
            req.params.id,
            {
                status,
                notes,
                reviewedBy,
                reviewedAt: new Date()
            },
            { new: true }
        );

        if (!verification) {
            return res.status(404).json({ msg: 'Verification request not found' });
        }

        res.json(verification);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

module.exports = router;
