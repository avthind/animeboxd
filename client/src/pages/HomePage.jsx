import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const HomePage = () => {
  const [newAnime, setNewAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        // Fetch trending/new and popular anime from dedicated endpoints
        const [trendingResponse, popularResponse] = await Promise.all([
          api.get("/anime/trending"),
          api.get("/anime/popular")
        ]);
        
        setNewAnime(trendingResponse.data || []);
        setPopularAnime(popularResponse.data || []);
        
        console.log('Trending anime count:', trendingResponse.data?.length, 'Popular anime count:', popularResponse.data?.length);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1920&q=80)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-base-100"></div>
        <div className="hero h-full relative z-10">
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold whitespace-nowrap">track. rate. discover.</h1>
              <p className="mb-5">
              Log every show you’ve watched, share your reviews, 
              and explore new favorites from fellow anime enthusiasts.
              </p>
              <Link to="/register" className="relative inline-block px-6 py-3 bg-base-content text-white font-bold uppercase tracking-tight border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                Get Started
                <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-base-content flex items-end justify-between">
            <span>new</span>
            <Link to="/new">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" onMouseEnter={(e) => e.currentTarget.style.stroke = 'oklch(87% 0.065 274.039)'} onMouseLeave={(e) => e.currentTarget.style.stroke = 'currentColor'}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </h2>
          <div className="border-b-2 mb-8" style={{ borderColor: 'oklch(87% 0.065 274.039)' }}></div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" style={{ color: 'oklch(87% 0.065 274.039)' }}></span>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4" style={{ paddingLeft: '4px' , paddingRight: '4px' }}>
              {newAnime.map((anime) => (
                <Link key={anime.id} to={`/anime/${anime.id}`} className="w-32 flex-shrink-0 block">
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
              <div className="flex-shrink-0" style={{ width: '0.5px' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Popular Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-base-content flex items-end justify-between">
            <span>popular</span>
            <Link to="/popular">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" onMouseEnter={(e) => e.currentTarget.style.stroke = 'oklch(87% 0.065 274.039)'} onMouseLeave={(e) => e.currentTarget.style.stroke = 'currentColor'}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </h2>
          <div className="border-b-2 mb-8" style={{ borderColor: 'oklch(87% 0.065 274.039)' }}></div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" style={{ color: 'oklch(87% 0.065 274.039)' }}></span>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4" style={{ paddingLeft: '4px' , paddingRight: '4px' }}>
              {popularAnime.map((anime) => (
                <Link key={anime.id} to={`/anime/${anime.id}`} className="w-32 flex-shrink-0 block">
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
              <div className="flex-shrink-0" style={{ width: '0.5px' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'oklch(96% 0.018 272.314)' }}>
            everything you need to track your anime
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Panel 1 - Top left */}
            <div className="bg-base-100 border-4 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-base font-black mb-2 uppercase tracking-tight border-b-4 border-black inline-block pb-1">
                Anime Tracking 🎬
              </h3>
              <p className="text-xs text-base-content font-medium relative z-10">
                Keep a log of every anime you've watched or are currently watching.
              </p>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>

            {/* Panel 2 - Top middle */}
            <div className="bg-base-100 border-4 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-base font-black mb-2 uppercase tracking-tight border-b-4 border-black inline-block pb-1">
                Personal Ratings ⭐
              </h3>
              <p className="text-xs text-base-content font-medium relative z-10">
                Share your opinions with ratings and reviews. Build your anime journal.
              </p>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>

            {/* Panel 3 - Top right (wide) */}
            <div className="md:col-span-2 bg-base-100 border-4 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-base font-black mb-2 uppercase tracking-tight border-b-4 border-black inline-block pb-1">
                Smart Recommendations 🔍
              </h3>
              <p className="text-xs text-base-content font-medium relative z-10">
                Get personalized anime suggestions based on your watch history, favorite genres, and ratings. Discover new favorites.
              </p>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>

            {/* Panel 5 - Bottom left (wide) */}
            <div className="md:col-span-2 bg-base-100 border-4 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-base font-black mb-2 uppercase tracking-tight border-b-4 border-black inline-block pb-1">
                Profile & Stats Dashboard 🏆
              </h3>
              <p className="text-xs text-base-content font-medium relative z-10">
                Track your stats: total hours watched, genres explored, completion rate, and more. Turn your watching habits into fun analytics.
              </p>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>

            {/* Panel 6 - Bottom middle */}
            <div className="bg-base-100 border-4 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-base font-black mb-2 uppercase tracking-tight border-b-4 border-black inline-block pb-1">
                Custom Lists 💾
              </h3>
              <p className="text-xs text-base-content font-medium relative z-10">
                Create themed anime lists like "Best 2020 Slice of Life."
              </p>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>

            {/* Panel 4 - Bottom right */}
            <div className="bg-base-100 border-4 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-base font-black mb-2 uppercase tracking-tight border-b-4 border-black inline-block pb-1">
                Community Feed 👥
              </h3>
              <p className="text-xs text-base-content font-medium relative z-10">
                See what your friends are watching and discussing. Join the conversation.
              </p>
              <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-black"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer sm:footer-horizontal bg-base-100 text-base-content items-center p-4">
        <aside className="grid-flow-col items-center">
          {/* <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg> */}
          <p> © {new Date().getFullYear()} animeboxd. All rights reserved.</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;

