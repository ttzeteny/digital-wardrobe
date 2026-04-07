import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, AppState, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ScanScreen.styles';
import { replace } from 'expo-router/build/global-state/routing';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScanClothingPage() {
  /* Hooks */
  /* Camera permission hooks */
  const [permission, getPermission, getPermissionsAsync] = useCameraPermissions();
  /* Capture photo hooks */
  const cameraRef = useRef<any>(null);
  const appState = React.useRef(AppState.currentState);
  const [isCapturing, setIsCapturing] = useState(false);
  /* Flash mode hooks */
  const [flash, setFlash] = useState('false');
  
  /* Save pending scan data */
  const savePendingScan = async (payload: { uri: string; base64?: string | null }) => {
    await AsyncStorage.setItem('pendingScan', JSON.stringify(payload));
  };

  /* Image picker */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:  [ 'images' ],
      quality: 1,
      allowsEditing: true,
      aspect: [1, 3],
      base64: true,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      await savePendingScan({ uri: selected.uri, base64: selected.base64 });
      replace('/confirmscan');
    }
  };

  /* Capture photo */
  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8, base64: true });

      if (!photo?.uri) {
        throw new Error('Camera did not return an image.');
      }

      await savePendingScan({ uri: photo.uri, base64: photo.base64 });
      replace('/confirmscan');
    } catch (error) {
      console.error('Failed to capture photo:', error);
      Alert.alert('Capture failed', error instanceof Error ? error.message : 'Could not capture the photo.');
    } finally {
      setIsCapturing(false);
    }
  };

  /* Permission handling */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active'
      ) {
        getPermissionsAsync();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Ionicons name="camera-outline" size={64} color="#ccc" />
        <Text style={styles.permissionText}>
          To scan your clothing, we need access to your camera.
        </Text>
        
        <TouchableOpacity 
          style={styles.permissionBtn} 
          onPress={async () => {
            const { granted } = await getPermission();
            if (!granted && !permission.canAskAgain) {
              Linking.openSettings();
            }
          }}
        >
          <Text style={styles.btnText}>Allow Camera Access</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => replace("/(tabs)")}>
          <Text style={{ color: '#666', marginTop: 15 }}>Not Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* Toggle flash mode */
  const toggleFlash = () => {
    setFlash(prev => (prev === 'false' ? 'true' : 'false'));
  }

  return (
    <View style={styles.container}>

      <CameraView 
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject} 
        facing="back"
        mode="picture"
        enableTorch={flash === 'true'}
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => replace("/(tabs)")}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraContainer} pointerEvents="none">
          <View style={styles.reticle} />
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity onPress={toggleFlash}>
            <Ionicons 
              name={flash === 'false' ? "flash-off" : "flash"} 
              size={28} 
              color={flash === 'true' ? "#FFD700" : "white"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shutterButton} onPress={() => takePicture()} disabled={isCapturing}>
            {isCapturing ? <ActivityIndicator color="white" /> : <View style={styles.shutterInner} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()}>
            <Ionicons name="images" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}