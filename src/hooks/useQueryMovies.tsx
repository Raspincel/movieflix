import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../api/moviesApi';
import useMovieConstructionData from './useMovieConstructionData';
import constructMoviesList from '../utils/constructMoviesList';

interface Args {
  query: string;
  page: number;
}

const useQueryMovies = ({ query, page }: Args) => {
  const { basePath, genres, isError: auxIsError, isLoading: auxIsLoading } = useMovieConstructionData();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => moviesApi.searchMovies(query, page),
    queryKey: ['searchMovies', query, page],
  });

  if (!isSuccess || auxIsError || auxIsLoading) {
    return {
      movies: [],
      totalPages: 0,
      totalResults: 0,
      isLoading: auxIsLoading || isLoading,
      isError: auxIsError || isError,
    };
  }

  const movies = constructMoviesList({
    movies: data.results,
    genres,
    cover: {
      baseUrl: basePath,
      size: 'w500',
    },
  });

  return {
    movies,
    // the api caps pages at 500
    totalPages: Math.min(500, data.total_pages),
    totalResults: Math.min(500*20, data.total_results),
    isLoading,
    isError,
  };
};

export default useQueryMovies;
