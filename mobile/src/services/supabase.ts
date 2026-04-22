/**
 * Supabase Client
 * 
 * Merkezi Supabase bağlantı yapılandırması.
 * AsyncStorage ile oturum kalıcılığı sağlanır.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hqkygobtpkmkhiiprxkv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3lnb2J0cGtta2hpaXByeGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjQwODUsImV4cCI6MjA5MjEwMDA4NX0.Yd6qQW1TJgsXt5IOPGqj9LXXYSwwi6jh1HzezdrdOb4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // React Native'de URL detection kapalı
  },
});
