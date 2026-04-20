import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles/ProfileScreen.styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { clearAuthData, getAuthData } from '../Utils/secureStore';
import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [user, setUser] = useState({ username: 'Loading...', email: '' });

  /* Username - Email fetch function */
  useEffect(() => {
    const loadUserData = async () => {
      const data = await getAuthData();
      if (data) {
        setUser({
          username: data.username ?? 'Unknown',
          email: data.email ?? 'example@example.com',
        });
      }
    };
    loadUserData();
  }, []);

  /* Logout function */
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={60} color="#A0A0A0" />
          </View>
          <View style={styles.headerData}>
            <Text style={styles.userName}>{user.username}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => router.replace('/settings')}>
              <AntDesign name="edit" size={20} color="white" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Items</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Outfits</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Value</Text>
            <Text style={styles.statValue}>$0</Text>
          </View>
        </View>
        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="notifications" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLabel}>
              <Ionicons name="language" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Language</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>{"English (US)"} ❯</Text>
          </TouchableOpacity>

        {/* Privacy & Security */}
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="lock-outline" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

        {/* Other */}
        <Text style={styles.sectionTitle}>Other</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="report-problem" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Report</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="help-outline" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Help</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="logout" size={24} color="#FF3B30" />
              <Text style={[styles.menuItemText, { color: '#FF3B30' }]} >Log Out</Text>
            </View>
          </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}