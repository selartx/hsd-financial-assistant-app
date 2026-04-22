/**
 * AuthNavigator
 * 
 * Oturum durumuna göre yönlendirme yapan guard bileşeni.
 * Sade splash ekranı.
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useSessionStore } from '@/state/session/session.store';

interface AuthNavigatorProps {
  children: React.ReactNode;
}

export default function AuthNavigator({ children }: AuthNavigatorProps) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isInitializing } = useSessionStore();

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === 'auth';

    if (isAuthenticated && inAuthGroup) {
      router.replace('/(main)/home');
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isInitializing, segments]);

  if (isInitializing) {
    return (
      <View style={styles.splash}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>H</Text>
        </View>
        <Text style={styles.title}>HSD Proje</Text>
        <ActivityIndicator color="#6C63FF" size="small" style={styles.spinner} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },
  spinner: {
    marginTop: 4,
  },
});
