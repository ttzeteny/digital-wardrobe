import { router, Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function TabLayout() {
  const router = useRouter();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#967662',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: styles.tabBar,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}

      />

      <Tabs.Screen
        name="wardrobe"
        options={{
          title: 'Wardrobe',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tshirt" color={color} />,
        }}
      />

      <Tabs.Screen
        name="scan-fab"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => router.push('/scan')}
              style={styles.fabContainer}
            >
              <View style={styles.fab}>
                <Ionicons name="add" size={32} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E5EA',
    height: Platform.OS === 'ios' ? 88 : 65,
    position: 'absolute',
  },
  fabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fab: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#D2B496',
    justifyContent: 'center',
    alignItems: 'center',
    
    marginTop: -20, 
    
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  }
});