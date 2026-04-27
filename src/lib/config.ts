type RuntimeConfig = {
  API_BASE_URL: string;
};

let runtimeConfig: RuntimeConfig | null = null;
let configLoading = true;

const defaultConfig: RuntimeConfig = {
  // In production, prefer same-origin instead of localhost so a Vercel
  // deploy can still work before a separate API URL is configured.
  API_BASE_URL: import.meta.env.PROD ? '/api' : '/api',
};

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const response = await fetch('/api/config');

    if (!response.ok) {
      return;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return;
    }

    runtimeConfig = await response.json();
  } catch (error) {
    console.warn('Failed to load runtime config, using fallback config.', error);
  } finally {
    configLoading = false;
  }
}

export function getConfig(): RuntimeConfig {
  if (configLoading) {
    return defaultConfig;
  }

  if (runtimeConfig) {
    return runtimeConfig;
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    return {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    };
  }

  return defaultConfig;
}

export function getAPIBaseURL(): string {
  const baseURL = getConfig().API_BASE_URL;

  if (baseURL === '/') {
    return '';
  }

  return baseURL;
}

export const config = {
  get API_BASE_URL() {
    return getAPIBaseURL();
  },
};
