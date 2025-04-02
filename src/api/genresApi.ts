import { Genre } from '../types/movie';
import { apiClient } from './client';

// Cria uma classe para abstrair as chamadas à API de gêneros
class GenresApi {
  async getGenres(): Promise<{ genres: Genre[] }> {
    const response = await apiClient.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data;
  }
}

export const genresApi = new GenresApi();
