import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Styles/ProfileScreen.styles';
import { router } from 'expo-router';
import { clearAuthData, getAuthData } from '../Utils/secureStore';
import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const [user, setUser] = useState({ username: 'Loading...', email: '' , currency: 'USD'});
  const [stats, setStats] = useState({ items: 0, outfits: 0, value: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await getAuthData();
      if (data) {
        setUser({
          username: data.username ?? 'Unknown',
          email: data.email ?? 'No email saved',
          currency: data.preferredCurrency ?? 'USD'
        });
      }
    };
    loadUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchStats = async () => {
        setIsLoadingStats(true);
        try {
          const authData = await getAuthData();
          if (!authData?.token) return;

          const userResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/me`, {
            headers: { 'Authorization': `Bearer ${authData.token}` }
          });
          
          let currentCurrency = 'USD';
          if (userResponse.ok) {
            const userData = await userResponse.json();
            currentCurrency = userData.preferredCurrency || 'USD';
            setUser(prev => ({ ...prev, currency: currentCurrency }));
          }

          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/clothes/my-wardrobe`, {
            headers: { 'Authorization': `Bearer ${authData.token}` }
          });

          if (response.ok) {
            const data = await response.json();
            
            const totalValue = data.reduce((sum: number, item: any) => {
              return sum + (item.price ? Number(item.price) : 0);
            }, 0);

            setStats({
              items: data.length,
              outfits: 0,
              value: totalValue
            });
          }
        } catch (error) {
          console.error("Error fetching stats", error);
        } finally {
          setIsLoadingStats(false);
        }
      };

      fetchStats();
    }, [])
  );

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

  const showComingSoon = (feature: string) => {
    Alert.alert("Coming Soon", `The ${feature} settings will be available in a future update!`);
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
            {isLoadingStats ? <ActivityIndicator size="small" color="#967662"/> : <Text style={styles.statValue}>{stats.items}</Text>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Outfits</Text>
            {isLoadingStats ? <ActivityIndicator size="small" color="#967662"/> : <Text style={styles.statValue}>{stats.outfits}</Text>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Value</Text>
            {isLoadingStats ? <ActivityIndicator size="small" color="#967662"/> : <Text style={styles.statValue}>{stats.value.toLocaleString()} {user.currency}</Text>}
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.replace('/settings')}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="payments" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Currency</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>{user.currency} ❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon("Notifications")}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="notifications" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon("Language")}>
            <View style={styles.menuItemLabel}>
              <Ionicons name="language" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Language</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>{"English (US)"} ❯</Text>
          </TouchableOpacity>

        {/* Privacy & Security */}
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon("Change Password")}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="lock-outline" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

        {/* Other */}
        <Text style={styles.sectionTitle}>Other</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon("Report")}>
            <View style={styles.menuItemLabel}>
              <MaterialIcons name="report-problem" size={24} color="#2C3E50" />
              <Text style={styles.menuItemText}>Report</Text>
            </View>
            <Text style={{ color: '#C7C7CC' }}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => showComingSoon("Help")}>
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