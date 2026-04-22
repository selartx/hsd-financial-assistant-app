/**
 * useAuth Hook
 * 
 * Login, signup ve logout işlemlerini yönetir.
 * Supabase Auth ile entegre.
 * Çift tıklama / birden fazla login isteği engellenir.
 */

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'expo-router';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '@/services/api/auth';
import { useSessionStore } from '@/state/session/session.store';
import type { AuthError } from '@/types/auth.types';

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoggingIn: boolean;
  error: string | null;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const setSession = useSessionStore((s) => s.setSession);
  const clearSession = useSessionStore((s) => s.clearSession);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRequestInFlight = useRef(false);

  const validateInputs = (email: string, password: string, name?: string) => {
    if (!email.trim()) return 'Lütfen e-posta adresinizi girin.';
    if (!password.trim()) return 'Lütfen şifrenizi girin.';
    if (name !== undefined && !name.trim()) return 'Lütfen adınızı girin.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return 'Geçerli bir e-posta adresi girin.';
    
    return null;
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (isRequestInFlight.current) return false;

    const validationError = validateInputs(email, password);
    if (validationError) {
      setError(validationError);
      return false;
    }

    isRequestInFlight.current = true;
    setIsLoggingIn(true);
    setError(null);

    try {
      const response = await apiLogin(email.trim(), password.trim());
      setSession(response.token, response.user);
      router.replace('/(main)/home');
      return true;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.');
      return false;
    } finally {
      setIsLoggingIn(false);
      isRequestInFlight.current = false;
    }
  }, [setSession, router]);

  const signup = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    if (isRequestInFlight.current) return false;

    const validationError = validateInputs(email, password, name);
    if (validationError) {
      setError(validationError);
      return false;
    }

    isRequestInFlight.current = true;
    setIsLoggingIn(true);
    setError(null);

    try {
      const response = await apiSignup(email.trim(), password.trim(), name.trim());
      setSession(response.token, response.user);
      router.replace('/(main)/home');
      return true;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'Kayıt yapılamadı. Lütfen tekrar deneyin.');
      return false;
    } finally {
      setIsLoggingIn(false);
      isRequestInFlight.current = false;
    }
  }, [setSession, router]);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
      clearSession();
      router.replace('/auth/login');
    } catch (err) {
      console.error('[Auth] Logout hatası:', err);
      clearSession();
      router.replace('/auth/login');
    }
  }, [clearSession, router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { login, signup, logout, isLoggingIn, error, clearError };
}
