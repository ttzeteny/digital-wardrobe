import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles/ProfileScreen.styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { clearAuthData, getAuthData } from '../Utils/secureStore';

export default function ProfileScreen() {
  const [user, setUser] = useState({ username: 'Loading...', email: '' });

  useEffect(() => {
    const loadUserData = async () => {
      const data = await getAuthData();
      if (data) {
        setUser({
          username: data.username,
          email: 'example@example.com',
        });
      }
    };
    loadUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Log Out", 
        style: "destructive", 
        onPress: async () => {
          await clearAuthData();   
          router.replace('/login');
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 40 }}>👤</Text> 
          </View>
          <Text style={styles.userName}>{user.username}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$0</Text>
            <Text style={styles.statLabel}>Value</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <Text style={{ color: '#C7C7CC' }}>❯</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Wardrobe Preferences</Text>
          <Text style={{ color: '#C7C7CC' }}>❯</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={[styles.menuItemText, { color: '#FF3B30' }]} >Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}