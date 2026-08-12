/**
 * API Configuration for OctoFit Tracker
 * 
 * Uses Vite environment variable VITE_CODESPACE_NAME to build the API base URL.
 * For Codespaces: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
 * For localhost: http://localhost:8000/api
 * 
 * IMPORTANT: VITE_CODESPACE_NAME must be defined in .env.local or as an environment variable
 * Example .env.local:
 *   VITE_CODESPACE_NAME=my-codespace-name
 */

const getApiBaseUrl = (): string => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();

export interface ApiResponse<T> {
  data: T[];
  _embedded?: { [key: string]: T[] };
}

/**
 * Fetch data from the API endpoint.
 * Handles both array responses and paginated responses.
 */
export const fetchFromApi = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle array response
    if (Array.isArray(data)) {
      return data;
    }

    // Handle paginated response with _embedded
    if (data._embedded && Array.isArray(data._embedded[Object.keys(data._embedded)[0]])) {
      return data._embedded[Object.keys(data._embedded)[0]];
    }

    // Handle single object wrapped in data property
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }

    // Fallback: return data as is
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};
