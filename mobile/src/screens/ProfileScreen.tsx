import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Style/ProfileScreen.styles';
import { router } from 'expo-router';

const handleLogout = () => {
  Alert.alert("Log Out", "Are you sure you want to log out?", [
    { text: "Cancel", style: "cancel" },
    { text: "Log Out", style: "destructive", 
      onPress: () => {
        // TODO: Implement actual logout logic here 
        // (clear auth tokens, reset user state, redirect to login screen)
        router.push('/login');
        console.log('User logged out');
      }
    }
  ]);
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 40 }}>👤</Text> 
          </View>
          <Text style={styles.userName}>Name</Text>
          <Text style={styles.userEmail}>example@example.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>###</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>###</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>###</Text>
            <Text style={styles.statLabel}>Value</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/SettingsScreen')}>
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
