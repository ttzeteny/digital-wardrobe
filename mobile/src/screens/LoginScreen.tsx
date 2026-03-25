import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const backendUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/clothes/test`;
      const response = await fetch(backendUrl);
      
      if (response.ok) {
        setIsLoading(false);
        router.replace('/(tabs)');
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Connection Error", "Cannot reach the backend server.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <Text style={styles.title}>Digital Wardrobe</Text>
        <Text style={styles.subtitle}>Make your dressing conscious. Rediscover your own wardrobe.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Log In</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  logoPlaceholder: { width: 80, height: 80, backgroundColor: '#F2F2F7', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoText: { color: '#8E8E93', fontWeight: '600', fontSize: 16 },
  title: { fontSize: 34, fontWeight: '800', color: '#000000', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#8E8E93', textAlign: 'center', lineHeight: 22 },
  buttonContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  primaryButton: { backgroundColor: '#007AFF', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 15, height: 56, justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
  secondaryButton: { backgroundColor: '#F2F2F7', paddingVertical: 16, borderRadius: 14, alignItems: 'center', height: 56, justifyContent: 'center' },
  secondaryButtonText: { color: '#007AFF', fontSize: 17, fontWeight: '600' },
});