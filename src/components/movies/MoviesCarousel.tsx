import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Movie } from '../../types/movie';
import MovieCard from '../movie/MovieCard';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface Props {
  fetchMovies: () => {
    movies: Movie[];
    isError: boolean;
    isLoading: boolean;
  };
  onEmpty?: () => void;
}

const MoviesCarousel = ({ fetchMovies, onEmpty }: Props) => {
  const { movies, isError, isLoading } = fetchMovies();
  const { t } = useTranslation();

  useEffect(() => {
    if ((isError || (!isLoading && !movies.length)) && onEmpty) {
      onEmpty();
    }
  }, [isError, isLoading, isError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-28">
        <LoaderCircle className="animate-spin h-6 w-6 text-gray-400 ml-2" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500 text-lg">{t('home.carouselError')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <Carousel responsive={responsive} infinite ssr={false} centerMode>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
