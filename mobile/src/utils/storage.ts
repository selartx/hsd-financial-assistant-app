/**
 * Storage Utility
 * AsyncStorage üzerinden token ve kullanıcı bilgisi yönetimi.
 * Token hiçbir zaman component içinde doğrudan saklanmaz — her zaman bu katman kullanılır.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '@/types/auth.types';

const STORAGE_KEYS = {
  TOKEN: '@hsd/auth_token',
  USER: '@hsd/auth_user',
} as const;

/**
 * Token'ı AsyncStorage'a kaydeder
 */
export async function saveToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } catch (error) {
    console.error('[Storage] Token kaydetme hatası:', error);
    throw error;
  }
}

/**
 * Token'ı AsyncStorage'dan okur
 */
export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error('[Storage] Token okuma hatası:', error);
    return null;
  }
}

/**
 * Token'ı AsyncStorage'dan siler
 */
export async function removeToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error('[Storage] Token silme hatası:', error);
    throw error;
  }
}

/**
 * Kullanıcı bilgisini AsyncStorage'a kaydeder
 */
export async function saveUser(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('[Storage] Kullanıcı kaydetme hatası:', error);
    throw error;
  }
}

/**
 * Kullanıcı bilgisini AsyncStorage'dan okur
 */
export async function getUser(): Promise<User | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch (error) {
    console.error('[Storage] Kullanıcı okuma hatası:', error);
    return null;
  }
}

/**
 * Tüm oturum verilerini temizler (logout sırasında kullanılır)
 */
export async function clearSession(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
  } catch (error) {
    console.error('[Storage] Oturum temizleme hatası:', error);
    throw error;
  }
}
