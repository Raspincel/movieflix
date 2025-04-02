import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../api/moviesApi';
import { Movie } from '../types/movie';
import constructMoviesList from '../utils/constructMoviesList';
import useMovieConstructionData from './useMovieConstructionData';

interface ReturnData {
  isLoading: boolean;
  isError: boolean;
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}

interface Args {
  page: number;
}

// Retorna os filmes mais populares dos últimos tempos da API
export default function usePopularMovies({ page }: Args): ReturnData {
  const { basePath, genres, isError: auxIsError, isLoading: auxIsLoading } = useMovieConstructionData();

  const {
    data: moviesData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: () => moviesApi.getPopularMovies({ pageParam: page }),
    queryKey: ['popularMovies', page],
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
    cover: {
      baseUrl: basePath,
      size: 'w500',
    },
    movies: moviesData.results,
    genres,
  });

  return {
    isLoading: false,
    isError: false,
    movies,
    // a api limita as páginas em 500
    totalPages: Math.min(500, moviesData.total_pages),
    totalResults: Math.min(500*20, moviesData.total_results)
  };
}
