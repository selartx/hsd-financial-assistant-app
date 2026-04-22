/**
 * Root Layout
 * 
 * Uygulamanın kök layout dosyası.
 * - Uygulama açılışında oturumu kontrol eder (initSession)
 * - AuthNavigator ile yönlendirme guard'ı sağlar
 * - Splash screen'i oturum kontrolü bitene kadar tutar
 */

import { useEffect } from 'react';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useSessionStore } from '@/state/session/session.store';
import AuthNavigator from '@/app/auth/AuthNavigator';

// Splash screen'i açılışta tut
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initSession = useSessionStore((s) => s.initSession);
  const isInitializing = useSessionStore((s) => s.isInitializing);

  // Uygulama açılışında AsyncStorage'dan oturumu kontrol et
  useEffect(() => {
    initSession();
  }, []);

  // Oturum kontrolü bitince splash screen'i kapat
  useEffect(() => {
    if (!isInitializing) {
      SplashScreen.hideAsync();
    }
  }, [isInitializing]);

  return (
    <AuthNavigator>
      <Slot />
    </AuthNavigator>
  );
}
