const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    status: { type: String, default: 'New' },
    applied: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    resumeFileName: { type: String, default: '' },
    details: {
        summary: String,
        linkedIn: String,
        education: Array,
        experience: Array,
        interviewTranscript: Array,
        architectureTask: Object
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
