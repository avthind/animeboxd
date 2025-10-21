import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("q") || "";

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await api.get(`/anime/search?q=${searchQuery}`);
      setResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      performSearch(urlQuery);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg" style={{ color: 'oklch(87% 0.065 274.039)' }}></span>
          </div>
        ) : results.length > 0 ? (
          <>
            <h1 className="text-3xl font-bold mb-2 text-base-content">
              Search Results ({results.length})
            </h1>
            <div className="border-b-2 mb-12" style={{ borderColor: 'oklch(87% 0.065 274.039)' }}></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {results.map((anime) => (
                <Link key={anime.id} to={`/anime/${anime.id}`} className="block">
                  <img
                    src={anime.coverImage?.large}
                    alt={anime.title?.romaji}
                    className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <p className="text-xs mt-2 text-base-content line-clamp-3 text-left">
                    {anime.title?.english || anime.title?.romaji || "Untitled"}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : query && !loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No results found</h3>
            <p className="text-base-content/60">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">Start Your Search</h3>
            <p className="text-base-content/60">Search for anime titles to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

