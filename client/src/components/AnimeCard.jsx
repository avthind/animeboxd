import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  return (
    <div className="card bg-neutral shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <figure className="relative overflow-hidden">
        <img 
          src={anime.coverImage?.large} 
          alt={anime.title?.romaji} 
          className="w-full h-80 object-cover"
        />
        {anime.averageScore && (
          <div className="badge badge-primary absolute top-2 right-2 gap-1">
            ⭐ {anime.averageScore / 10}
          </div>
        )}
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base line-clamp-2 min-h-[3rem]">
          {anime.title?.romaji || "Untitled"}
        </h3>
        {anime.genres && (
          <div className="flex flex-wrap gap-1 mb-2">
            {anime.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="badge badge-accent badge-sm">
                {genre}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-end">
          <Link to={`/anime/${anime.id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;

