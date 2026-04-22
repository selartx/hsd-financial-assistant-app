/**
 * Auth API Service — Supabase Auth
 * 
 * Supabase Auth ile kullanıcı giriş/çıkış/kayıt işlemleri.
 */

import { supabase } from '@/services/supabase';
import type { AuthResponse, AuthError, User } from '@/types/auth.types';

/**
 * Login — e-posta ve şifre ile giriş
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw mapSupabaseError(error.message);
  }

  if (!data.session || !data.user) {
    throw {
      message: 'Oturum bilgisi alınamadı.',
      code: 'UNKNOWN_ERROR',
    } as AuthError;
  }

  // Profil bilgisini çek
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email')
    .eq('id', data.user.id)
    .single();

  const user: User = {
    id: data.user.id,
    name: profile?.name || data.user.email?.split('@')[0] || 'Kullanıcı',
    email: data.user.email || email,
  };

  return {
    token: data.session.access_token,
    user,
  };
}

/**
 * Signup — yeni kullanıcı kayıt
 */
export async function signup(email: string, password: string, name?: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name || email.split('@')[0] },
    },
  });

  if (error) {
    throw mapSupabaseError(error.message);
  }

  if (!data.session || !data.user) {
    throw {
      message: 'Kayıt başarılı. Lütfen e-postanızı doğrulayın.',
      code: 'UNKNOWN_ERROR',
    } as AuthError;
  }

  const user: User = {
    id: data.user.id,
    name: name || email.split('@')[0],
    email: data.user.email || email,
  };

  return {
    token: data.session.access_token,
    user,
  };
}

/**
 * Logout — oturumu kapat
 */
export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('[Auth] Logout hatası:', error.message);
  }
}

/**
 * Mevcut oturumu kontrol et
 */
export async function getCurrentSession(): Promise<AuthResponse | null> {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email')
    .eq('id', session.user.id)
    .single();

  return {
    token: session.access_token,
    user: {
      id: session.user.id,
      name: profile?.name || session.user.email?.split('@')[0] || 'Kullanıcı',
      email: session.user.email || '',
    },
  };
}

/**
 * Supabase hata mesajlarını Türkçe AuthError'a dönüştür
 */
function mapSupabaseError(message: string): AuthError {
  const lower = message.toLowerCase();

  if (lower.includes('invalid login credentials') || lower.includes('invalid_credentials')) {
    return { message: 'E-posta veya şifre hatalı.', code: 'INVALID_CREDENTIALS' };
  }
  if (lower.includes('email not confirmed')) {
    return { message: 'E-posta adresinizi doğrulamanız gerekiyor.', code: 'INVALID_CREDENTIALS' };
  }
  if (lower.includes('user already registered')) {
    return { message: 'Bu e-posta adresi zaten kayıtlı.', code: 'INVALID_CREDENTIALS' };
  }
  if (lower.includes('network') || lower.includes('fetch')) {
    return { message: 'Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.', code: 'NETWORK_ERROR' };
  }
  if (lower.includes('timeout')) {
    return { message: 'İstek zaman aşımına uğradı.', code: 'TIMEOUT' };
  }

  return { message: message || 'Beklenmeyen bir hata oluştu.', code: 'UNKNOWN_ERROR' };
}
