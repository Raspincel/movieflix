import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';
import Rating from './Rating';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Link to={`/filme/${movie.id}`}>
      <div
        key={movie.id}
        className="relative group overflow-clip rounded-2xl shadow-xl transition-all duration-500 hover:shadow-cyan-500/20 hover:shadow-xl max-w-96 aspect-[500/750] mx-2 cursor-pointer"
      >
        {/* Se o filme não tiver imagem, mostra um pôster cinza pulsando no lugar */}
        {movie.cover ? (
          <img
            src={movie.cover}
            alt={movie.title}
            className="w-full h-full object-fit transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 animate-pulse"></div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 max-md:opacity-100 max-md:translate-y-0 transition-all duration-500">
          <h2 className="text-3xl font-bold text-white mb-2 max-md:text-xs max-md:text-center">{movie.title}</h2>
          <div className="flex items-center mb-4 max-md:hidden">
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {movie.genres.map((genre) => genre.name).join(', ')}
            </span>
          </div>

          <span className='max-md:hidden'>
            <Rating rating={movie.rating} />
          </span>
        </div>

        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
          ★ {movie.rating.toFixed(1)}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
