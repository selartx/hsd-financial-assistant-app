import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUpload } from '../../hooks/useUpload';
import { useUploadStore } from '../../state/upload/upload.store';
import { UploadProgress } from '../../components/upload/UploadProgress';

export default function UploadPreviewScreen() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();
  const { startUpload, reset } = useUpload();
  const { status, progress, errorMessage } = useUploadStore();

  React.useEffect(() => {
    if (status === 'success') {
      router.push("/upload/UploadSuccessScreen");
    }
  }, [status]);

  const onUploadPress = async () => {
    if (status === 'uploading') return; 
    await startUpload(uri as string);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Belge Önizleme</Text>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: uri as string }} 
          style={styles.preview} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Dosya: {uri?.toString().split('/').pop()}</Text>
      </View>

      {status === 'uploading' && <UploadProgress progress={progress} />}
      
      {status === 'error' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
        </View>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.primaryButton, status === 'uploading' && styles.disabledButton]} 
          onPress={onUploadPress}
          disabled={status === 'uploading'}
        >
          <Text style={styles.buttonText}>
            {status === 'uploading' ? "Yükleniyor..." : "Yüklemeyi Başlat"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => { reset(); router.back(); }}
          disabled={status === 'uploading'}
        >
          <Text style={styles.secondaryButtonText}>İptal Et</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 22, fontWeight: '700', marginVertical: 20, color: '#fff' },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#1a1a1a', // Form arka planı
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252525'
  },
  preview: { width: '100%', height: '100%' },
  infoContainer: { marginBottom: 30 },
  infoText: { fontSize: 14, color: '#888' },
  buttonGroup: { width: '100%', gap: 12 },
  primaryButton: {
    backgroundColor: '#6C63FF', // HSD Moru
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryButtonText: { color: '#f87171', fontSize: 15, fontWeight: '600' }, // Hata rengiyle uyumlu
  disabledButton: { opacity: 0.6 },
  errorBox: {
    backgroundColor: 'rgba(220, 50, 50, 0.1)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(220, 50, 50, 0.3)',
    width: '100%',
    marginBottom: 20
  },
  errorText: { color: '#f87171', fontSize: 14, textAlign: 'center' }
});