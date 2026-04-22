/**
 * HomeScreen
 * 
 * Ana ekran — Kullanıcı giriş yaptıktan sonra bu ekranı görür.
 * Sade tasarım: kullanıcı bilgileri ve logout.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { useSessionStore } from '@/state/session/session.store';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const user = useSessionStore((s) => s.user);
  const { logout } = useAuth();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmLogout = window.confirm('Oturumunuzu kapatmak istediğinize emin misiniz?');
      if (confirmLogout) {
        logout();
      }
    } else {
      Alert.alert(
        'Çıkış Yap',
        'Oturumunuzu kapatmak istediğinize emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" translucent />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {user?.name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Hoş geldiniz</Text>
            <Text style={styles.name}>{user?.name || 'Kullanıcı'}</Text>
          </View>
        </View>

        {/* Kullanıcı Bilgileri */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hesap Bilgileri</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Ad</Text>
            <Text style={styles.rowValue}>{user?.name || '-'}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>E-posta</Text>
            <Text style={styles.rowValue}>{user?.email || '-'}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>ID</Text>
            <Text style={styles.rowValue}>{user?.id || '-'}</Text>
          </View>
        </View>

        {/* Bilgi */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Authentication modülü aktif. Diğer modüller eklendikçe burada görünecektir.
          </Text>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Oturumu Kapat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerText: {
    marginLeft: 14,
  },
  greeting: {
    fontSize: 13,
    color: '#888',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 2,
  },

  /* Card */
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 13,
    color: '#666',
  },
  rowValue: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#252525',
  },

  /* Info */
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 24,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },

  /* Logout */
  logoutBtn: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  logoutText: {
    color: '#f87171',
    fontSize: 14,
    fontWeight: '600',
  },
});
