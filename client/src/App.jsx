import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NewPage from './pages/NewPage';
import PopularPage from './pages/PopularPage';
import SearchPage from './pages/SearchPage';
import AnimeDetail from './pages/AnimeDetail';
import WatchlistPage from './pages/WatchlistPage';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-100 text-base-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
