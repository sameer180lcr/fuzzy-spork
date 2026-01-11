const mongoose = require('mongoose');

const VerificationCompanyDetailSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    companyData: {
        companyName: { type: String, required: true },
        website: { type: String, required: true },
        email: { type: String, required: true },
        registrationNumber: { type: String },
        industry: { type: String, required: true },
        size: { type: String, required: true },
        foundedYear: { type: Number },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
        taxId: { type: String }
    },
    representatives: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true },
        linkedin: { type: String },
        isPrimary: { type: Boolean, default: false }
    }],
    verificationChecks: {
        domainVerified: { type: Boolean, required: true },
        emailVerified: { type: Boolean, required: true },
        businessRegistrationVerified: { type: Boolean, required: true },
        registrationNumber: { type: String }
    },
    status: {
        type: String,
        enum: ['pending', 'in_review', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    reviewedAt: {
        type: Date
    },
    reviewedBy: {
        type: String
    },
    notes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('VerificationCompanyDetail', VerificationCompanyDetailSchema);
