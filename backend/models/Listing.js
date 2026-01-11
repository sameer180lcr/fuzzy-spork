const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    department: { type: String, default: 'Engineering' },
    location: { type: String, default: 'Remote' },
    employmentType: { type: String, default: 'Full-time' },
    minSalary: { type: Number },
    maxSalary: { type: Number },
    description: { type: String },
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    status: { type: String, default: 'active' },
    applicants: { type: Number, default: 0 },
    urgentHiring: { type: Boolean, default: false },
    featuredListing: { type: Boolean, default: false },
    postedDate: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
});

module.exports = mongoose.model('Listing', ListingSchema);
