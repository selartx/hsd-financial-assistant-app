import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useUploadStore } from '../../state/upload/upload.store';

export default function UploadSuccessScreen() {
  const router = useRouter();
  const resetUpload = useUploadStore((s) => s.reset);

  const handleFinish = () => {
    resetUpload();
    router.replace('/(main)/home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✓</Text>
      </View>
      
      <Text style={styles.title}>İşlem Tamamlandı!</Text>
      <Text style={styles.subtitle}>
        Belgeniz başarıyla yüklendi. Finansal analiziniz birazdan hazır olacak.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', padding: 30 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#6C63FF', // HSD Moru
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  icon: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#888', textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  button: {
    backgroundColor: '#6C63FF', paddingVertical: 16, borderRadius: 12, width: '100%', alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});