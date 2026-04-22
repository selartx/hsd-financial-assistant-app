/**
 * Main Group Layout
 * 
 * Korumalı rotalar için layout — sadece oturum açıkken erişilebilir.
 */

import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F0F1A' },
        animation: 'slide_from_right',
      }}
    />
  );
}
