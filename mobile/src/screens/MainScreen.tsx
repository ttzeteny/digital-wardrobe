import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from '../Styles/MainScreen.styles';

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.logoPlaceholder}>
          <Image 
            source={require('../Images/logo_var2.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Digital Wardrobe</Text>
        <Text style={styles.subtitle}>Make your dressing conscious. Rediscover your own wardrobe.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/login')} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Log In</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/register')} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.secondaryButtonText}>Create Account</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}