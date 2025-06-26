import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachings = async () => {
      try {
        const res = await fetch('https://harvesters-hub.onrender.com/api/teachings');
        const data = await res.json();

        // Shuffle teachings randomly
        const shuffled = data.sort(() => 0.5 - Math.random());
        setTeachings(shuffled);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teachings:', err);
        setLoading(false);
      }
    };

    fetchTeachings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Harvesters Logo" className="h-10 w-auto" />
        </div>
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link to="/" className="text-blue-600">Home</Link></li>
          <li><Link to="/campuses" className="hover:text-blue-600">Campuses</Link></li>
          <li>
            <Link
              to="/login"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-2xl sm:text-3xl font-bold">Latest Teachings & Sermons</h1>
        <p className="text-gray-600 mt-2">
          Discover life-changing messages from our pastors and grow in your faith journey
        </p>
      </header>

      {/* Teachings Section */}
      <section className="px-6 py-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : teachings.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <div className="text-5xl mb-2">🎥</div>
            <p>No videos available</p>
            <p className="text-sm">Check back soon for new teachings and sermons.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachings.map((teaching) => (
              <div key={teaching._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={teaching.videoUrl}
                    title={teaching.title || 'Teaching Video'}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">
                    {teaching.title || 'Untitled'}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {teaching?.campus?.name
                      ? `${teaching.campus.name} Campus`
                      : 'Main Church'}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>👁 {teaching.views}</span>
                    <span>❤️ {teaching.likes}</span>
                    <span>💬 {teaching.comments?.length || 0}</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Link
                      to={`/teaching/${teaching._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/teaching/${teaching._id}`
                        );
                        alert('Link copied to clipboard!');
                      }}
                      className="text-gray-500 text-sm hover:text-gray-700"
                    >
                      Share 🔗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
