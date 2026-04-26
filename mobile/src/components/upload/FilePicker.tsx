import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const FilePicker = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>Dosya veya Fotoğraf Seç</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6C63FF', // HSD Moru
    paddingVertical: 18,
    borderRadius: 14,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  text: { color: 'white', fontWeight: '700', fontSize: 16 }
});