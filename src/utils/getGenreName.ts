import { genresApi } from '../api/genresApi';

const getGenreName = async (genreId: number) => {
  const { genres } = await genresApi.getGenres();

  const genre = genres.find((genre) => genre.id === genreId);

  return genre?.name;
};

export default getGenreName;
