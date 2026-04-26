import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UploadProgressProps {
  progress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Yükleniyor... %{progress}</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 15 },
  text: { marginBottom: 8, fontSize: 14, color: '#555', textAlign: 'center' },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF', // Yüzdeye göre dolacak kısım
  },
});