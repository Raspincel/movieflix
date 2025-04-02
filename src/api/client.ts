import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: { 'Content-Type': 'application/json' },
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

apiClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const language = localStorage.getItem('mytia-movie-app-language') || 'pt-BR';
  config.params = { ...config.params, language };

  return config;
});
