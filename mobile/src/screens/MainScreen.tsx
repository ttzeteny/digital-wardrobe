import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image , StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from '../Styles/MainScreen.styles';

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

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
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/(tabs)')} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Developer Log In</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/login')} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Log In</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/register')} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.secondaryButtonText}>Create Account</Text>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}