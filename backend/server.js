const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const listingsRouter = require('./routes/listings');
const applicationsRouter = require('./routes/applications');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const verificationRouter = require('./routes/verification');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';
mongoose.connect(MONGODB_URI) // Removed deprecated options
  .then(() => console.log(`MongoDB Connected to ${MONGODB_URI}`))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/listings', listingsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);
app.use('/api/verification', verificationRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
