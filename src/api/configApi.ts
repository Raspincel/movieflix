import { TMDBConfiguration } from '../types/config';
import { apiClient } from './client';

class ConfigApi {
  async getConfig(): Promise<TMDBConfiguration> {
    const response = await apiClient.get<TMDBConfiguration>('/configuration');
    return response.data;
  }
}

export const configApi = new ConfigApi();
