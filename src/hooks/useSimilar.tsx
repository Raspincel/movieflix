import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../api/moviesApi';
import { configApi } from '../api/configApi';
import { Movie } from '../types/movie';
import { genresApi } from '../api/genresApi';
import constructMoviesList from '../utils/constructMoviesList';

interface ReturnData {
  isLoading: boolean;
  isError: boolean;
  movies: Movie[];
}

const useSimilar = (movieId: number): ReturnData => {
  const {
    data: genresData,
    isError: genresError,
    isLoading: genresLoading,
    isSuccess: genresSuccess,
  } = useQuery({
    queryFn: genresApi.getGenres,
    queryKey: ['genres'],
  });

  const {
    data: configData,
    isError: configError,
    isLoading: configLoading,
    isSuccess: configSuccess,
  } = useQuery({
    queryFn: configApi.getConfig,
    queryKey: ['config'],
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => moviesApi.getSimilarMovie(movieId),
    queryKey: ['similar', movieId],
  });

  if (!isSuccess || !configSuccess || !genresSuccess) {
    return {
      isLoading: isLoading || configLoading || genresLoading,
      isError: isError || configError || genresError,
      movies: [],
    };
  }

  const movies = constructMoviesList({
    cover: {
      baseUrl: configData.images.base_url,
      size: 'w500',
    },
    movies: data.results,
    genres: genresData.genres,
  });

  return { isLoading: false, isError: false, movies };
};

export default useSimilar;
