import { TMDBConfiguration } from '../types/config';
import { apiClient } from './client';

// Cria uma classe para abstrair as chamadas à API de configuração
class ConfigApi {
  async getConfig(): Promise<TMDBConfiguration> {
    const response = await apiClient.get<TMDBConfiguration>('/configuration');
    return response.data;
  }
}

export const configApi = new ConfigApi();
