import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image , StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from '../Styles/MainScreen.styles';
import { getAuthData, saveAuthData } from '../Utils/secureStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Required", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    
    try {
      const backendUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`;
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        if (!data?.token) {
          Alert.alert("Login Failed", "Backend did not return a valid token.");
          return;
        }

        const normalizedToken = String(data.token).trim().replace(/^"|"$/g, '');
        const saved = await saveAuthData(normalizedToken, data.username, email);
        if (!saved) {
          Alert.alert("Login Failed", "Could not persist session token on this device.");
          return;
        }

        const authData = await getAuthData();
        if (!authData?.token) {
          Alert.alert("Login Failed", "Session token was not readable after save.");
          return;
        }
        
        router.replace('/(tabs)');
      } else {
        Alert.alert("Login Failed", data.error || "Invalid credentials.");
      }

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Connection Error", "Cannot reach the backend server.");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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
              
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Log in to manage your digital wardrobe and plan your next outfit.</Text>

              <View style={{ width: '100%', marginTop: 30 }}>
                <TextInput
                  style={styles.loginput}
                  placeholder="Email Address"
                  placeholderTextColor="#8E8E93"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.passwordInput}>
                  <TextInput
                    style={styles.loginput}
                    placeholder="Password"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry={!visible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <MaterialIcons
                  style={styles.iconStyle}
                  name={visible ? "visibility" : "visibility-off"}
                  size={24} 
                  color="black"
                  onPress={() => {setVisible(!visible)}}
                  />
                </View>
                
                
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 5, marginBottom: 8}}>
                  <Text style={{ color: '#967662', fontWeight: '500' }}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={handleLogin} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Log In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton} 
                onPress={() => router.push('/register')}
              >
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}