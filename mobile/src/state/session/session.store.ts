/**
 * Session Store (Zustand)
 * 
 * Global state yalnızca session için kullanılır.
 * Supabase Auth ile entegre — oturum kontrolü Supabase üzerinden yapılır.
 */

import { create } from 'zustand';
import type { User } from '@/types/auth.types';
import { getCurrentSession } from '@/services/api/auth';

interface SessionState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

interface SessionActions {
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
  initSession: () => Promise<void>;
}

type SessionStore = SessionState & SessionActions;

const initialState: SessionState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isInitializing: true,
};

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,

  /**
   * Login başarılı → store güncelle
   * (Supabase kendi session'ını AsyncStorage'a otomatik kaydeder)
   */
  setSession: (token: string, user: User) => {
    set({
      token,
      user,
      isAuthenticated: true,
      isInitializing: false,
    });
  },

  /**
   * Logout → store sıfırla
   */
  clearSession: () => {
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitializing: false,
    });
  },

  /**
   * Uygulama açılışında Supabase session kontrol et
   */
  initSession: async () => {
    set({ isInitializing: true });

    try {
      const session = await getCurrentSession();

      if (session) {
        set({
          token: session.token,
          user: session.user,
          isAuthenticated: true,
          isInitializing: false,
        });
      } else {
        set({
          ...initialState,
          isInitializing: false,
        });
      }
    } catch (error) {
      console.error('[Session] Oturum yükleme hatası:', error);
      set({
        ...initialState,
        isInitializing: false,
      });
    }
  },
}));
