// Configuración centralizada de APIs y endpoints del backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  eacStatus: `${API_BASE_URL}/api/eac/status`,
  upload: (subjectId) => `${API_BASE_URL}/api/upload/${subjectId}`,
};
