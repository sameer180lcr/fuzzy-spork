const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Get Profile by User ID
router.get('/:userId', async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.userId });
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create or Update Profile
router.post('/', async (req, res) => {
    const { userId, resume, availability, workPreference, communication, account, skills, experience, education } = req.body;

    try {
        let profile = await Profile.findOne({ userId });

        if (profile) {
            // Update
            profile.resume = resume || profile.resume;
            profile.availability = availability || profile.availability;
            profile.workPreference = workPreference || profile.workPreference;
            profile.communication = communication || profile.communication;
            profile.account = account || profile.account;

            // Resume tab specific fields
            if (req.body.city !== undefined) profile.city = req.body.city;
            if (req.body.country !== undefined) profile.country = req.body.country;
            if (req.body.linkedin !== undefined) profile.linkedin = req.body.linkedin;
            if (req.body.noLinkedin !== undefined) profile.noLinkedin = req.body.noLinkedin;
            if (req.body.resumeFileName !== undefined) profile.resumeFileName = req.body.resumeFileName;

            // Availability tab fields
            if (req.body.availabilityHours !== undefined) profile.availabilityHours = req.body.availabilityHours;
            if (req.body.timezone !== undefined) profile.timezone = req.body.timezone;
            if (req.body.workingHours !== undefined) profile.workingHours = req.body.workingHours;

            // Work Preferences tab fields
            if (req.body.domainInterests !== undefined) profile.domainInterests = req.body.domainInterests;
            if (req.body.compensationFullTime !== undefined) profile.compensationFullTime = req.body.compensationFullTime;
            if (req.body.compensationPartTime !== undefined) profile.compensationPartTime = req.body.compensationPartTime;

            // Communications tab fields
            if (req.body.communicationPreferences !== undefined) profile.communicationPreferences = req.body.communicationPreferences;

            // Optional fields
            if (skills) profile.skills = skills;
            if (experience) profile.experience = experience;
            if (education) profile.education = education;

            profile = await profile.save();
            return res.json(profile);
        }

        // Create
        profile = new Profile({
            userId,
            resume,
            resumeFileName: req.body.resumeFileName,
            availability,
            workPreference,
            communication,
            account,
            city: req.body.city,
            country: req.body.country,
            linkedin: req.body.linkedin,
            noLinkedin: req.body.noLinkedin,
            skills,
            experience,
            education
        });

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
