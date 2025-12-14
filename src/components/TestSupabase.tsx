import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setListings(data || []);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load listings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleCreateTestListing = async () => {
    try {
      const testListing = {
        title: 'Test Listing ' + new Date().toISOString(),
        description: 'This is a test listing',
        price: 99.99,
        location: 'Test Location',
        category: 'test',
        status: 'active',
        image_urls: ['https://example.com/test.jpg'],
        contact_email: 'test@example.com'
      };

      const { data, error } = await supabase
        .from('listings')
        .insert([testListing])
        .select();

      if (error) throw error;
      
      // Refresh the listings
      if (data) {
        setListings(prev => [data[0], ...prev]);
      }
    } catch (err) {
      console.error('Error creating test listing:', err);
      setError('Failed to create test listing. Please check the console for details.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>
      
      <button
        onClick={handleCreateTestListing}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
      >
        Create Test Listing
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Listings</h2>
      <div className="space-y-4">
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <div className="grid gap-4">
            {listings.map((listing) => (
              <div key={listing.id} className="border p-4 rounded-lg shadow">
                <h3 className="font-bold">{listing.title}</h3>
                <p className="text-gray-600">{listing.description}</p>
                <p className="text-lg font-semibold">${listing.price}</p>
                <p className="text-sm text-gray-500">
                  {new Date(listing.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
