import React from 'react';
import { View, StyleSheet, Text, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { FilePicker } from '../../components/upload/FilePicker'; 

export default function UploadScreen() {
  const router = useRouter();

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        router.push({
          pathname: "/upload/UploadPreviewScreen",
          params: { uri: result.assets[0].uri }
        });
      }
    } catch (error) {
      Alert.alert("Hata", "Dosya seçilirken bir sistem hatası oluştu.");
      console.error("Document Picker Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Finansal Belge Yükleme</Text>
        <Text style={styles.subtitle}>Analiz için dökümanınızı seçin</Text>
      </View>
      <FilePicker onPress={handlePickDocument} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#111' // Koyu tema
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#fff' // Beyaz metin
  },
  subtitle: {
    fontSize: 14,
    color: '#888', // Gri alt başlık
    marginTop: 8,
  }
});