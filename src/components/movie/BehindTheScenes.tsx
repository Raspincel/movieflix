import { DetailedMovie } from '../../types/movie';
import MovieCast from './MovieCast';
import MovieDetails from './MovieDetails';

interface Props {
  movie: DetailedMovie;
}

const BehindTheScenes = ({ movie }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MovieCast cast={movie.cast} />

        <MovieDetails budget={movie.budget} director={movie.director?.name} revenue={movie.revenue} />
      </div>
    </div>
  );
};

export default BehindTheScenes;
