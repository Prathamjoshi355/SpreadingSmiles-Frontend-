const rawApiUrl = import.meta.env.VITE_API_URL || '/api';

const normalizeApiBaseUrl = (url: string) => {
  const trimmed = url.trim().replace(/\/+$/, '');

  if (!trimmed) {
    return '/api';
  }

  if (trimmed === '/api' || trimmed.endsWith('/api')) {
    return trimmed;
  }

  return `${trimmed}/api`;
};

export const API_BASE_URL = normalizeApiBaseUrl(rawApiUrl);

export const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
