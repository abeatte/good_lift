// API configuration
const API_BASE_URI = 'https://liftingcast.com/api';
const COUCHDB_BASE_URI = 'https://couchdb.liftingcast.com';

export const apiClient = {
  baseGet: async <T>(endpoint: string): Promise<T> => api.get(API_BASE_URI, endpoint),
  basePost: async <T>(endpoint: string, data: unknown): Promise<T> => api.post(API_BASE_URI, endpoint, data),
  couchGet: async <T>(endpoint: string): Promise<T> => api.get(COUCHDB_BASE_URI, endpoint),
  couchPost: async <T>(endpoint: string, data: unknown): Promise<T> => api.post(COUCHDB_BASE_URI, endpoint, data),
}

const api = {
  get: async <T>(baseUri: string, endpoint: string): Promise<T> => {
    const response = await fetch(`${baseUri}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },

  post: async <T>(baseUri: string, endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${baseUri}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};
