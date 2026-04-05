import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { styles } from '../Styles/WardrobeScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useEffect, useState } from 'react';
import { getAuthData } from '../Utils/secureStore';
import { push } from 'expo-router/build/global-state/routing';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CategoryItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

export default function WardrobeScreen() {

  const [user, setUser] = useState({ username: 'Loading...', email: '' });
  
    useEffect(() => {
      const loadUserData = async () => {
        const data = await getAuthData();
        if (data) {
          setUser({
            username: data.username ?? 'Unknown',
            email: 'example@example.com',
          });
        }
      };
      loadUserData();
    }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View onTouchEnd={() => push('/profile')}>
                <ImageBackground
                  source={require('../Images/avatar.png')}
                  style={styles.avatarPlaceholder}
                  imageStyle={{ borderRadius: 22.5 }}
                  resizeMode="cover"
              />
              </View>
              <View>
                <Text style={styles.greetingText}>Welcome back,</Text>
                <Text style={styles.userName}>{user.username}</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconCircle}><EvilIcons name="search" size={24} color="black" /></TouchableOpacity>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <CategoryItem icon="grid-outline" label="ALL ITEMS" active />
              <CategoryItem icon="shirt-outline" label="SHIRTS" />
              <CategoryItem icon="calendar" label="" />
              <CategoryItem icon="sparkles" label="" />
            </ScrollView>
          </ScrollView>
    </SafeAreaView>
  );
}

const CategoryItem = ({ icon, label, active }: CategoryItemProps) => (
  <TouchableOpacity style={[styles.catItem, active && styles.catItemActive]}>
    <Ionicons name={icon as any} size={18} color={active ? '#FFF' : '#2C3E50'} />
    <Text style={[styles.catLabel, active && styles.catLabelActive]}>{label}</Text>
  </TouchableOpacity>
);