/**
 * Auth Group Layout
 * 
 * Auth rotaları için layout — header gizli, dark arka plan.
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F0F1A' },
        animation: 'fade',
      }}
    />
  );
}
