import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../api/moviesApi';
import constructMoviesList from '../utils/constructMoviesList';
import useMovieConstructionData from './useMovieConstructionData';

interface Args {
  genreId: number;
  page: number;
}

const useMoviesPerGenre = ({ genreId, page }: Args) => {
  const { basePath, genres, isError: auxIsError, isLoading: auxIsLoading } = useMovieConstructionData();

  const {
    data: moviesData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryFn: () => moviesApi.getMoviesPerGenre({ genreId, pageParam: page }),
    queryKey: ['genre', genreId, page],
  });

  if (!isSuccess || auxIsError || auxIsLoading) {
    return {
      isLoading: auxIsLoading || isLoading,
      isError: auxIsError || isError,
      movies: [],
      totalPages: 0,
      totalResults: 0,
    };
  }

  const movies = constructMoviesList({
    movies: moviesData.results,
    cover: {
      baseUrl: basePath,
      size: 'w500',
    },
    genres,
  });

  return { 
    movies,
    isLoading,
    isError,
    // the api caps pages at 500
    totalPages: Math.min(500, moviesData.total_pages),
    totalResults: Math.min(500*20, moviesData.total_results)
  };
};

export default useMoviesPerGenre;
