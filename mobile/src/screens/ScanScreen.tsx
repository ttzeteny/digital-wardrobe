import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, AppState } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ScanScreen.styles';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function ScanClothingPage() {
  const [permission, getPermission, getPermissionsAsync] = useCameraPermissions();
  const appState = React.useRef(AppState.currentState);
  const router = useRouter();
  const [flash, setFlash] = useState('false');

  const toggleFlash = () => {
    setFlash(prev => (prev === 'false' ? 'true' : 'false'));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:  [ 'images' ],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected image:", result.assets[0].uri);
      // Here the image would be cropped and sent to database and scan confirm page would be shown to set parameters and confirm the scan.
    }
  };

  const takePicture = async () => {
    console.log("Snap!");
    // Here the image would be cropped and sent to database and scan confirm page would be shown to set parameters and confirm the scan.
  };

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
        
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#666', marginTop: 15 }}>Not Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing="back"
        mode="picture"
        enableTorch={flash === 'true'}
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
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
          <TouchableOpacity style={styles.shutterButton} onPress={() => takePicture()}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()}>
            <Ionicons name="images" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}