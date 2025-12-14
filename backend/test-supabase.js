const { saveListing, getListings, getListingById } = require('./utils/supabase');

async function testSupabase() {
  try {
    console.log('Testing Supabase Integration...');
    
    // Test creating a new listing
    const newListing = {
      title: 'Test Listing',
      description: 'This is a test listing',
      price: 99.99,
      location: 'Test Location',
      category: 'test',
      image_urls: ['https://example.com/image1.jpg'],
      contact_email: 'test@example.com',
      contact_phone: '+1234567890',
      metadata: { test: true }
    };

    console.log('Creating test listing...');
    const createdListing = await saveListing(newListing);
    console.log('✅ Created listing:', createdListing);

    // Test getting all listings
    console.log('\nFetching all listings...');
    const listings = await getListings();
    console.log('✅ All listings:', listings);

    // Test getting a single listing
    if (listings && listings.length > 0) {
      const listingId = listings[0].id;
      console.log(`\nFetching listing with ID: ${listingId}`);
      const singleListing = await getListingById(listingId);
      console.log('✅ Single listing:', singleListing);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSupabase();
