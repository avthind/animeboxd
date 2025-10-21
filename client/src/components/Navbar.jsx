import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-base-100 shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Left section - Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile dropdown - only visible on mobile */}
            <div className="lg:hidden">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li><Link to="/new">new</Link></li>
                  <li><Link to="/popular">popular</Link></li>
                  <li>
                    {user ? (
                      <button onClick={logout}>sign out</button>
                    ) : (
                      <Link to="/login">sign in</Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/" className="text-3xl font-bold">animeboxd</Link>
          </div>

          {/* Center section - Tabs (Desktop only) */}
          <div className="hidden lg:flex justify-center">
            <div role="tablist" className="tabs">
              <Link to="/new" role="tab" className={`tab hover:border-b-2 ${location.pathname === '/new' ? 'border-b-2' : ''}`} style={{ borderColor: 'oklch(87% 0.065 274.039)' }}>
                new
              </Link>
              <Link to="/popular" role="tab" className={`tab hover:border-b-2 ${location.pathname === '/popular' ? 'border-b-2' : ''}`} style={{ borderColor: 'oklch(87% 0.065 274.039)' }}>
                popular
              </Link>
              {user ? (
                <button onClick={logout} role="tab" className="tab hover:border-b-2" style={{ borderColor: 'oklch(87% 0.065 274.039)' }}>
                  sign out
                </button>
              ) : (
                <Link to="/login" role="tab" className={`tab hover:border-b-2 ${location.pathname === '/login' ? 'border-b-2' : ''}`} style={{ borderColor: 'oklch(87% 0.065 274.039)' }}>
                  sign in
                </Link>
              )}
            </div>
          </div>

          {/* Right section - Search bar */}
          <div className="flex justify-end">
            <form onSubmit={handleSearch} className="relative">
              <label className="input input-sm flex items-center gap-2 focus-within:outline-none focus-within:border-black focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-base-100 rounded-none relative overflow-visible">
                <svg className="h-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ stroke: 'oklch(35% 0.144 278.697)' }}>
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="grow outline-none focus:outline-none bg-transparent placeholder:text-base-content"
                />
                <div className="absolute bottom-1 right-1 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-black pointer-events-none z-10"></div>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

