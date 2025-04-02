import axios from 'axios';

// Cria uma instância do axios para fazermos as requisições para a API do TMDB
export const apiClient = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: { 'Content-Type': 'application/json' },
  params: {
    // Optional de `VITE_TMDB_TOKEN` estiver disponível
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// Interceptação de requisições para adicionar o token de autenticação
// e o idioma da aplicação. Opcional se `VITE_TMDB_API_KEY` estiver disponível
apiClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const language = localStorage.getItem('mytia-movie-app-language') || 'pt-BR';
  config.params = { ...config.params, language };

  return config;
});
