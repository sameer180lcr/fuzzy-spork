const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true // Assumption: One profile per user
    },
    resume: {
        type: String, // URL or File Path
        default: ''
    },
    resumeFileName: {
        type: String, // Store the uploaded resume file name
        default: ''
    },
    availability: {
        type: String, // e.g., "Immediately", "1-2 weeks"
        default: ''
    },
    availabilityHours: {
        type: String, // Preferred time commitment (e.g., "40")
        default: '40'
    },
    timezone: {
        type: String,
        default: 'Asia/Kolkata'
    },
    workingHours: {
        type: Array, // Array of objects for weekly schedule
        default: []
    },
    workPreference: {
        type: String, // e.g., "Remote", "On-site", "Hybrid"
        default: ''
    },
    domainInterests: {
        type: [String], // Selected domains
        default: []
    },
    compensationFullTime: {
        type: Number,
        default: 0
    },
    compensationPartTime: {
        type: Number,
        default: 0
    },
    communication: {
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        preferredMethod: { type: String, default: 'email' }
    },
    communicationPreferences: {
        emailEnabled: { type: Boolean, default: true },
        smsEnabled: { type: Boolean, default: true },
        fullTimeOpps: { type: Boolean, default: true },
        partTimeOpps: { type: Boolean, default: true },
        referralOpps: { type: Boolean, default: true },
        jobOpps: { type: Boolean, default: true },
        workUpdates: { type: Boolean, default: true },
        unsubscribeAll: { type: Boolean, default: false }
    },
    account: {
        username: { type: String, default: '' },
        fullName: { type: String, default: '' },
        avatar: { type: String, default: '' },
        genAI: { type: Boolean, default: true }
    },
    // Resume tab specific fields
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    linkedin: {
        type: String,
        default: ''
    },
    noLinkedin: {
        type: Boolean,
        default: false
    },
    // Adding extra fields that might be useful based on common profile pages
    skills: [String],
    experience: [Object],
    education: [Object]
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
