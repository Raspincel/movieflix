import { useQuery } from '@tanstack/react-query';
import { genresApi } from '../api/genresApi';
import { Genre } from '../types/movie';

interface ReturnData {
  genre: Genre | undefined;
  isLoading: boolean;
  isError: boolean;
}

// Retorna os dados de todos os gêneros da API
const useGenre = (genreId: number): ReturnData => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: genresApi.getGenres,
    queryKey: ['genres'],
  });

  if (isLoading || isError || !isSuccess) {
    return {
      genre: undefined,
      isLoading,
      isError,
    };
  }

  const genre = data.genres.find((genre: any) => genre.id === genreId);

  return {
    genre,
    isLoading: false,
    isError: false,
  };
};

export default useGenre;
