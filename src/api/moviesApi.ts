import { DetailedMovieFetchResponse, FetchMovieCreditsResponse, MovieFetchResponse } from '../types/movie';
import { apiClient } from './client';

// Cria uma classe para abstrair as chamadas à API de filmes
class MoviesApi {
  async getTopRatedMovies({ pageParam }: { pageParam: number }): Promise<MovieFetchResponse> {
    const response = await apiClient.get<MovieFetchResponse>(
      `/movie/top_rated?page=${pageParam}`
    );

    return response.data;
  }

  async getPopularMovies({ pageParam }: { pageParam: number }): Promise<MovieFetchResponse> {
    const response = await apiClient.get<MovieFetchResponse>(
      `/movie/popular?page=${pageParam}&sort_by=popularity.desc`
    );

    return response.data;
  }

  async getMoviesPerGenre({ genreId, pageParam }: { genreId: number; pageParam: number }): Promise<MovieFetchResponse> {
    const response = await apiClient.get<MovieFetchResponse>(
      `/discover/movie?with_genres=${genreId}&page=${pageParam}`
    );

    return response.data;
  }

  async getMovie(movieId: number) {
    const movie = await apiClient.get<DetailedMovieFetchResponse>(`/movie/${movieId}`);

    return movie.data;
  }

  async getMovieCredits(movieId: number) {
    const response = await apiClient.get<FetchMovieCreditsResponse>(`movie/${movieId}/credits`);

    return response.data;
  }

  async getSimilarMovie(id: number) {
    const response = await apiClient.get<MovieFetchResponse>(`movie/${id}/similar?page=1`);
    return response.data;
  }

  async searchMovies(query: string, page: number) {
    const response = await apiClient.get<MovieFetchResponse>(`search/movie?query=${query}&page=${page}`);
    return response.data;
  }
}

export const moviesApi = new MoviesApi();
