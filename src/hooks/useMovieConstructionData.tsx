import { Genre } from '../types/movie';
import { genresApi } from '../api/genresApi';
import { configApi } from '../api/configApi';
import { useQuery } from '@tanstack/react-query';

interface ReturnData {
  isLoading: boolean;
  isError: boolean;
  basePath: string;
  genres: Genre[];
}

const useMovieConstructionData = (): ReturnData => {
  const {
    data: genresData,
    isError: errorGenres,
    isLoading: genresLoading,
    isSuccess: genresSuccess,
  } = useQuery({
    queryFn: genresApi.getGenres,
    queryKey: ['genres'],
  });

  const {
    data: configData,
    isError: errorConfig,
    isLoading: configLoading,
    isSuccess: successConfig,
  } = useQuery({
    queryFn: configApi.getConfig,
    queryKey: ['config'],
  });

  if (!genresSuccess || !successConfig) {
    return {
      isLoading: genresLoading || configLoading,
      isError: errorGenres || errorConfig,
      basePath: '',
      genres: [],
    };
  }

  return {
    isLoading: false,
    isError: false,
    basePath: configData.images.base_url,
    genres: genresData.genres,
  };
};

export default useMovieConstructionData;
