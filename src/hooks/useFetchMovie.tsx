import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../api/moviesApi';
import { configApi } from '../api/configApi';
import { DetailedMovie } from '../types/movie';
import { formatCurrency, formatMinutes } from '../utils/format';

const useFetchMovie = (id: number) => {
  const {
    data: configData,
    isError: errorConfig,
    isLoading: configLoading,
    isSuccess: successConfig,
  } = useQuery({
    queryFn: configApi.getConfig,
    queryKey: ['config'],
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => moviesApi.getMovie(id),
    queryKey: ['movie', id],
  });

  const {
    data: creditsData,
    isLoading: creditsLoading,
    isError: creditsError,
    isSuccess: creditsSuccess,
  } = useQuery({
    queryFn: () => moviesApi.getMovieCredits(data!.id),
    queryKey: ['movie-credits', id],
    enabled: isSuccess && data !== undefined,
  });

  if (!isSuccess || !successConfig || !creditsSuccess) {
    return {
      isLoading: configLoading || isLoading || creditsLoading,
      isError: errorConfig || isError || creditsError,
      movie: null,
    };
  }

  const director = creditsData.crew.find((person: any) => person.job === 'Director')!;

  const movie: DetailedMovie = {
    title: data.title,
    rating: Number(data.vote_average.toFixed(1)),
    cover: data.poster_path ? configData.images.base_url + 'w500' + data.poster_path : '',
    year: data.release_date.split('-')[0],
    id: data.id,
    description: data.overview,
    genres: data.genres,
    backdrop: configData.images.base_url + 'original' + data.backdrop_path,
    runtime: data.runtime ? formatMinutes(data.runtime) : 'N/A',
    revenue: data.revenue ? formatCurrency(data.revenue) : 'N/A',
    budget: data.budget ? formatCurrency(data.budget) : 'N/A',
    director: {
      id: director?.id,
      name: director?.name,
    },
    cast: creditsData.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 12)
      .map((actor) => ({
        id: actor.id,
        name: actor.name,
        picture: actor.profile_path ? configData.images.base_url + 'w500' + actor.profile_path : '',
        character: actor.character,
      })),
  };

  return { movie, isLoading: false, isError: false };
};

export default useFetchMovie;
