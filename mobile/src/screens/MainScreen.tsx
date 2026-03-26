import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from '../Styles/MainScreen.styles';

export default function MainScreen() {
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
        { /* This button is for testing. It doesn't require log in and will attempt to connect to the backend.*/ }
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Enter without Login</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/login')} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Log In</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/register')} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.secondaryButtonText}>Create Account</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}