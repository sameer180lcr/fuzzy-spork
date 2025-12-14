const express = require('express');
const router = express.Router();
const { saveListing, getListings, getListingById } = require('../utils/supabase');

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const listingData = req.body;
    const newListing = await saveListing(listingData);
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await getListings();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await getListingById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
