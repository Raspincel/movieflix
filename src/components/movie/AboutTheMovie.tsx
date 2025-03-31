import { useTranslation } from '../../hooks/useTranslation';
import { DetailedMovie } from '../../types/movie';
import Rating from './Rating';

interface Props {
  movie: DetailedMovie;
}

const AboutTheMovie = ({ movie }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-96 bg-gray-800 pt-36 md:pt-16">
      {movie.backdrop && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 bg-no-repeat"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
      )}

      <div className="relative container mx-auto px-4 py-8 h-full">
        <div className="flex flex-col md:flex-row items-start h-full gap-8">
          {movie.cover ? (
            <img
              src={movie.cover}
              alt={movie.title}
              className="w-48 rounded-lg shadow-xl max-md:hidden hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-48 h-72 bg-gray-700 not-motion-reduce:animate-pulse rounded-lg shadow-xl max-md:hidden"></div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <Rating rating={movie.rating} />
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
              <span>{movie.genres.map((genre) => genre.name).join(', ')}</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl">{movie.description || t('movie.descriptionNotFound')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheMovie;
