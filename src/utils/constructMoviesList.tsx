import { ApiMovie, Genre, Movie } from '../types/movie';

interface Args {
  cover: {
    baseUrl: string;
    size: string;
  };
  movies: ApiMovie[];
  genres: Genre[];
}

// Recebe os dados da API e retorna um array de filmes
const constructMoviesList = ({ genres, movies, cover }: Args): Movie[] => {
  return movies.map((movie) => ({
    title: movie.title,
    rating: Number(movie.vote_average.toFixed(1)),
    cover: movie.poster_path ? cover.baseUrl + cover.size + movie.poster_path : '',
    year: movie.release_date.split('-')[0],
    id: movie.id,
    description: movie.overview,
    genres: genres.filter((genre) => movie.genre_ids.includes(genre.id)),
  }));
};

export default constructMoviesList;
