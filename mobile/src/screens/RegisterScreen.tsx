import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from '../Styles/MainScreen.styles';

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      Alert.alert("Missing Fields", "Please fill in all details to create an account.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement registration logic (Update the endpoint as needed)
      const backendUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/auth/register`;
      
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => router.replace('/(tabs)') }
        ]);
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Registration Failed", "Unable to connect to the server.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          
          <View style={styles.content}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>JOIN</Text>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey towards a more conscious wardrobe today.</Text>
            
            <View style={{ width: '100%', marginTop: 30 }}>
              <TextInput
                style={styles.Reginput}
                placeholder="Full Name"
                placeholderTextColor="#8E8E93"
                value={formData.fullName}
                onChangeText={(text) => setFormData({...formData, fullName: text})}
              />
              <TextInput
                style={styles.Reginput}
                placeholder="Email Address"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
              />
              <TextInput
                style={styles.Reginput}
                placeholder="Password"
                placeholderTextColor="#8E8E93"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleRegister} 
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Sign Up</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.secondaryButtonText}>Already have an account? Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};