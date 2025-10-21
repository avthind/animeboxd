import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const WatchlistPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      try {
        const res = await api.get("/watchlist");
        setWatchlist(res.data);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchWatchlist();
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/watchlist/${id}`);
      setWatchlist(watchlist.filter(entry => entry._id !== id));
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    }
  };

  const filteredWatchlist = filter === "all" 
    ? watchlist 
    : watchlist.filter(entry => entry.status === filter);

  const statusBadgeColor = (status) => {
    switch(status) {
      case "watching": return "badge-primary";
      case "completed": return "badge-success";
      case "plan-to-watch": return "badge-warning";
      case "dropped": return "badge-error";
      default: return "badge-ghost";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Watchlist</h1>
          <p className="text-base-content/70">Track and manage your anime collection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="tabs tabs-boxed bg-neutral mb-8 inline-flex">
          <button 
            className={`tab ${filter === "all" ? "tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({watchlist.length})
          </button>
          <button 
            className={`tab ${filter === "watching" ? "tab-active" : ""}`}
            onClick={() => setFilter("watching")}
          >
            Watching
          </button>
          <button 
            className={`tab ${filter === "completed" ? "tab-active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button 
            className={`tab ${filter === "plan-to-watch" ? "tab-active" : ""}`}
            onClick={() => setFilter("plan-to-watch")}
          >
            Plan to Watch
          </button>
          <button 
            className={`tab ${filter === "dropped" ? "tab-active" : ""}`}
            onClick={() => setFilter("dropped")}
          >
            Dropped
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg" style={{ color: 'oklch(87% 0.065 274.039)' }}></span>
          </div>
        ) : filteredWatchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredWatchlist.map((entry) => (
              <div key={entry._id} className="card bg-neutral shadow-xl hover:shadow-2xl transition-all duration-300">
                <figure className="relative overflow-hidden">
                  <img 
                    src={entry.anime.coverImage?.large} 
                    alt={entry.anime.title?.romaji}
                    className="w-full h-80 object-cover"
                  />
                  <div className={`badge ${statusBadgeColor(entry.status)} absolute top-2 left-2`}>
                    {entry.status}
                  </div>
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-base line-clamp-2 min-h-[3rem]">
                    {entry.anime.title?.romaji}
                  </h3>
                  {entry.rating && (
                    <div className="flex items-center gap-1 text-warning">
                      <span>⭐</span>
                      <span className="font-semibold">{entry.rating}/10</span>
                    </div>
                  )}
                  <div className="card-actions justify-between mt-2">
                    <Link 
                      to={`/anime/${entry.anime.id}`} 
                      className="btn btn-primary btn-sm flex-1"
                    >
                      Details
                    </Link>
                    <button 
                      onClick={() => handleRemove(entry._id)}
                      className="btn btn-error btn-sm btn-outline"
                      title="Remove from watchlist"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold mb-2">
              {filter === "all" ? "Your watchlist is empty" : `No ${filter} anime`}
            </h3>
            <p className="text-base-content/60 mb-4">
              Start adding anime to your watchlist
            </p>
            <Link to="/" className="btn btn-primary">
              Browse Anime
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;

