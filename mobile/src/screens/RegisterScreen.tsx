import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from '../Styles/MainScreen.styles';

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const getPasswordStrength = (password : string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*+=:;<,>.,?/_"'-]/.test(password)) strength++;
  return strength;
  };
  const strength = getPasswordStrength(formData.password);
  
  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      Alert.alert("Missing Fields", "Please fill in all details to create an account.");
      return;
    }

    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || 
        !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*+-=:;<,>.,?/_"']/.test(formData.password)) {
      Alert.alert("Password does not meet the requirements!");
      return;
    }

    if (formData.password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const backendUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/auth/register`;
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert("Registration Failed", data.error || "Email already in use.");
      }

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Connection Error", "Unable to connect to the server.");
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
              <Image 
                          source={require('../Images/logo_var2.png')} 
                          style={styles.logoImage} 
                          resizeMode="contain"
                        />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey towards a more conscious wardrobe today.</Text>
            
            <View style={{ width: '100%', marginTop: 30 }}>
              <TextInput
                style={styles.reginput}
                placeholder="Username"
                placeholderTextColor="#8E8E93"
                value={formData.username}
                onChangeText={(text) => setFormData({...formData, username: text})}
              />
              <TextInput
                style={styles.reginput}
                placeholder="Email Address"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
              />
              <TextInput
                style={styles.reginput}
                placeholder="Password"
                placeholderTextColor="#8E8E93"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
              />
              <View style={styles.strengthBarContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.strengthBar,
                    index <= strength ? styles.activeBar : styles.inactiveBar
                  ]}
                />
              ))}
              </View>
              <Text style={[
                styles.requirementText, 
                strength === 5 ? styles.validText : styles.invalidText
              ]}>
                At least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 special character.
              </Text>
              <TextInput
                style={styles.reginput}
                placeholder="Confirm Password"
                placeholderTextColor="#8E8E93"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
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
              onPress={() => router.push('/login')}
            >
              <Text style={styles.secondaryButtonText}>Already have an account? Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};