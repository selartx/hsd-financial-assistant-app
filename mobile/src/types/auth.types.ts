/**
 * Auth Types
 * Tüm authentication ile ilgili tip tanımlamaları
 */

/** Kullanıcı bilgisi */
export interface User {
  id: string;
  name: string;
  email: string;
}

/** Login isteği payload'ı */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Login response'u (backend'den dönen) */
export interface AuthResponse {
  token: string;
  user: User;
}

/** API hata yapısı */
export interface AuthError {
  message: string;
  code: 'INVALID_CREDENTIALS' | 'NETWORK_ERROR' | 'TIMEOUT' | 'SERVER_ERROR' | 'UNKNOWN_ERROR';
}
