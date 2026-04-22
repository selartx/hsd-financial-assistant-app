/**
 * LoginScreen
 * 
 * Sade, modern giriş ekranı.
 * - Temiz koyu tema
 * - Giriş yap / Kayıt ol modları
 * - Hata mesajı gösterimi
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, signup, isLoggingIn, error, clearError } = useAuth();
  const passwordRef = useRef<TextInput>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (isLoginMode) {
      await login(email, password);
    } else {
      await signup(email, password, name);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    clearError();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5b5b5bff" translucent />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>

              <Text style={styles.title}>HSD Proje</Text>
              <Text style={styles.subtitle}>
                {isLoginMode ? 'Hesabınıza giriş yapın' : 'Yeni bir hesap oluşturun'}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Hata */}
              {error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Ad (Sadece kayıt olma modunda) */}
              {!isLoginMode && (
                <>
                  <Text style={styles.label}>Ad Soyad</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Adınız"
                    placeholderTextColor="#555"
                    value={name}
                    onChangeText={(t) => { setName(t); if (error) clearError(); }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="next"
                    editable={!isLoggingIn}
                  />
                </>
              )}

              {/* E-posta */}
              <Text style={styles.label}>E-posta</Text>
              <TextInput
                style={styles.input}
                placeholder="ornek@email.com"
                placeholderTextColor="#555"
                value={email}
                onChangeText={(t) => { setEmail(t); if (error) clearError(); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                editable={!isLoggingIn}
              />

              {/* Şifre */}
              <Text style={styles.label}>Şifre</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  ref={passwordRef}
                  style={[styles.input, styles.passwordInput]}
                  placeholder="En az 6 karakter"
                  placeholderTextColor="#555"
                  value={password}
                  onChangeText={(t) => { setPassword(t); if (error) clearError(); }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  editable={!isLoggingIn}
                />
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.toggleText}>
                    {showPassword ? 'Gizle' : 'Göster'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Giriş / Kayıt Butonu */}
              <TouchableOpacity
                style={[styles.button, isLoggingIn && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isLoggingIn}
                activeOpacity={0.7}
              >
                {isLoggingIn ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>
                    {isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Mod Değiştirme Butonu */}
              <TouchableOpacity
                style={styles.switchModeBtn}
                onPress={toggleMode}
                disabled={isLoggingIn}
              >
                <Text style={styles.switchModeText}>
                  {isLoginMode
                    ? "Hesabınız yok mu? Kayıt Olun"
                    : "Zaten hesabınız var mı? Giriş Yapın"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },

  /* Form */
  form: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#252525',
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 6,
    marginTop: 16,
  },

  input: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },

  passwordRow: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 70,
  },
  toggleBtn: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  toggleText: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '600',
  },

  /* Button */
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  /* Switch Mode */
  switchModeBtn: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  switchModeText: {
    color: '#aaa',
    fontSize: 13,
  },

  /* Error */
  errorBox: {
    backgroundColor: 'rgba(220, 50, 50, 0.12)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(220, 50, 50, 0.25)',
  },
  errorText: {
    color: '#f87171',
    fontSize: 13,
    lineHeight: 18,
  },
});
