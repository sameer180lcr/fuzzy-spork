const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or key. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to save a new listing
const saveListing = async (listingData) => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([listingData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving listing:', error);
    throw error;
  }
};

// Function to get all listings
const getListings = async () => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

// Function to get a single listing by ID
const getListingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching listing ${id}:`, error);
    throw error;
  }
};

module.exports = {
  saveListing,
  getListings,
  getListingById,
  supabase
};
