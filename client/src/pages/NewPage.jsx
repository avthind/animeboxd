import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const NewPage = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewAnime = async () => {
      try {
        const response = await api.get("/anime/trending");
        setAnime(response.data);
      } catch (error) {
        console.error("Failed to fetch trending anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewAnime();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-base-content">new anime</h1>
        <div className="border-b-2 mb-12" style={{ borderColor: 'oklch(87% 0.065 274.039)' }}></div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" style={{ color: 'oklch(87% 0.065 274.039)' }}></span>
          </div>
        ) : anime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {anime.map((item) => (
              <Link key={item.id} to={`/anime/${item.id}`} className="block">
                <img
                  src={item.coverImage?.large}
                  alt={item.title?.romaji}
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
                <p className="text-xs mt-2 text-base-content line-clamp-3 text-left">
                  {item.title?.english || item.title?.romaji || "Untitled"}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold mb-2">No new anime found</h3>
            <p className="text-base-content/60">Check back later for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPage;

