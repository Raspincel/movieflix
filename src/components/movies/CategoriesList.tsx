import { useQuery } from '@tanstack/react-query';
import { genresApi } from '../../api/genresApi';
import CategorySection from './CategorySection';
import useMoviesPerGenre from '../../hooks/useMoviesPerGenre';

const CategoriesList = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: genresApi.getGenres,
    queryKey: ['genres'],
  });

  if (isLoading || isError || !isSuccess) {
    return null;
  }

  return (
    <>
      {data.genres.map(({ id, name }) => {
        return (
          <CategorySection
            key={id}
            id={id}
            title={name}
            fetchMovies={() => useMoviesPerGenre({ genreId: id, page: 1 })}
          />
        );
      })}
    </>
  );
};

export default CategoriesList;
