const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const listingData = req.body;
    const newListing = new Listing(listingData);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ postedDate: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a listing
router.put('/:id', async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a listing
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("DELETE request for ID:", id);

  if (!id || id === 'undefined' || id === 'null') {
    console.log("Invalid ID provided for deletion");
    return res.status(400).json({ error: 'Invalid ID provided' });
  }

  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      console.log("Listing not found for ID:", req.params.id);
      return res.status(404).json({ error: 'Listing not found' });
    }
    console.log("Listing deleted successfully:", req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error("Error deleting listing:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
