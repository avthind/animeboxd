import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const AnimeDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("plan-to-watch");

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/anime/${id}`);
        setAnime(res.data);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  const handleAddToWatchlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setAddingToWatchlist(true);
    try {
      await api.post("/watchlist", {
        animeId: id,
        status: selectedStatus,
        anime: anime
      });
      alert("Added to watchlist!");
    } catch (error) {
      console.error("Failed to add to watchlist:", error);
      alert("Failed to add to watchlist. It may already be in your list.");
    } finally {
      setAddingToWatchlist(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" style={{ color: 'oklch(87% 0.065 274.039)' }}></span>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Anime not found</h2>
          <button 
            onClick={() => navigate("/")} 
            className="relative px-6 py-3 bg-base-content text-white font-bold uppercase tracking-tight border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Back to Search
            <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat border-b-4 border-black"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.95)), url(${anime.bannerImage || anime.coverImage?.extraLarge})`
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-5xl font-black mb-2 text-white drop-shadow-lg uppercase tracking-tight">
              {anime.title?.romaji}
            </h1>
            {anime.title?.english && anime.title.english !== anime.title.romaji && (
              <p className="text-xl text-gray-300 mb-2 font-bold">{anime.title.english}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cover & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative sticky top-4">
              <img 
                src={anime.coverImage?.extraLarge || anime.coverImage?.large} 
                alt={anime.title?.romaji}
                className="w-full border-b-4 border-black"
              />
              <div className="p-4">
                {/* Score */}
                {anime.averageScore && (
                  <div className="bg-base-200 border-4 border-black p-4 mb-4 relative text-center">
                    <div className="text-xs font-bold uppercase tracking-tight mb-2">User Score</div>
                    <div className="text-4xl font-black" style={{ color: 'oklch(87% 0.065 274.039)' }}>
                      {(anime.averageScore / 10).toFixed(1)}
                    </div>
                    <div className="text-xs font-bold uppercase mt-1">/ 10</div>
                    <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-black"></div>
                  </div>
                )}

                {/* Add to Watchlist */}
                <div className="form-control w-full mb-2">
                  <select 
                    className="select w-full border-4 border-black bg-base-200 focus:outline-none focus:border-black focus:ring-0 rounded-none font-bold uppercase text-xs tracking-tight"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="plan-to-watch">Plan to Watch</option>
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>
                <button 
                  className="relative w-full px-6 py-3 bg-base-content text-white font-bold uppercase tracking-tight border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
                  onClick={handleAddToWatchlist}
                  disabled={addingToWatchlist}
                >
                  {addingToWatchlist ? "Adding..." : "Add to Watchlist"}
                  <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
                </button>

                {/* Quick Info */}
                <div className="border-b-2 border-black my-4"></div>
                <div className="space-y-2 text-sm">
                  {anime.format && (
                    <div className="flex justify-between">
                      <span className="font-bold uppercase text-xs tracking-tight">Format:</span>
                      <span className="font-bold">{anime.format}</span>
                    </div>
                  )}
                  {anime.episodes && (
                    <div className="flex justify-between">
                      <span className="font-bold uppercase text-xs tracking-tight">Episodes:</span>
                      <span className="font-bold">{anime.episodes}</span>
                    </div>
                  )}
                  {anime.status && (
                    <div className="flex justify-between">
                      <span className="font-bold uppercase text-xs tracking-tight">Status:</span>
                      <span className="font-bold">{anime.status}</span>
                    </div>
                  )}
                  {anime.season && anime.seasonYear && (
                    <div className="flex justify-between">
                      <span className="font-bold uppercase text-xs tracking-tight">Season:</span>
                      <span className="font-bold">{anime.season} {anime.seasonYear}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div>
                <h2 className="text-2xl font-black mb-3 uppercase tracking-tight">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span key={genre} className="px-4 py-2 bg-base-200 border-4 border-black font-bold uppercase text-xs tracking-tight relative">
                      {genre}
                      <div className="absolute bottom-0.5 right-0.5 w-0 h-0 border-l-[6px] border-l-transparent border-b-[6px] border-b-black"></div>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {anime.description && (
              <div className="bg-base-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative p-6">
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tight border-b-4 border-black inline-block pb-1">Synopsis</h2>
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: anime.description }} 
                />
                <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
              </div>
            )}

            {/* Studios */}
            {anime.studios?.nodes && anime.studios.nodes.length > 0 && (
              <div className="bg-base-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative p-6">
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tight border-b-4 border-black inline-block pb-1">Studios</h2>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.nodes.map((studio) => (
                    <span key={studio.id} className="px-4 py-2 bg-base-200 border-4 border-black font-bold uppercase text-xs tracking-tight relative">
                      {studio.name}
                      <div className="absolute bottom-0.5 right-0.5 w-0 h-0 border-l-[6px] border-l-transparent border-b-[6px] border-b-black"></div>
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              {anime.popularity && (
                <div className="bg-base-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative p-6 text-center">
                  <div className="text-xs font-bold uppercase tracking-tight mb-2">Popularity</div>
                  <div className="text-3xl font-black" style={{ color: 'oklch(87% 0.065 274.039)' }}>
                    #{anime.popularity}
                  </div>
                  <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-black"></div>
                </div>
              )}
              {anime.favourites && (
                <div className="bg-base-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative p-6 text-center">
                  <div className="text-xs font-bold uppercase tracking-tight mb-2">Favorites</div>
                  <div className="text-3xl font-black" style={{ color: 'oklch(87% 0.065 274.039)' }}>
                    {anime.favourites.toLocaleString()}
                  </div>
                  <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-black"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;

