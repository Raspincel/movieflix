import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const language = localStorage.getItem('mytia-movie-app-language') || 'pt-BR';
  config.params = { ...config.params, language, api_key: apiKey };

  return config;
});
