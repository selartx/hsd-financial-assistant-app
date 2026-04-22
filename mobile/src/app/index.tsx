/**
 * Index Route
 * 
 * Kök yol — AuthNavigator zaten yönlendirmeyi yönetiyor.
 * Bu dosya Expo Router'ın hata vermemesi için gerekli.
 */

import { Redirect } from 'expo-router';
import { useSessionStore } from '@/state/session/session.store';

export default function Index() {
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(main)/home" />;
  }

  return <Redirect href="/auth/login" />;
}
