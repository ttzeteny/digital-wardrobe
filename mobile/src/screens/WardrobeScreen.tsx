import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { styles } from '../Styles/WardrobeScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getAuthData } from '../Utils/secureStore';
import { push, replace } from 'expo-router/build/global-state/routing';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CategoryItemProps {
  icon: string;
  label: string;
  id: number;
  active?: boolean;
}

export default function WardrobeScreen() {
  const [active, setActive] = useState(1);

  const CategoryItem = ({ icon, label, id, active }: CategoryItemProps) => (
  <TouchableOpacity style={[styles.catItem, active && styles.catItemActive]} onPress={() => setActive(id)}>
    <Ionicons name={icon as any} size={18} color={active ? '#FFF' : '#2C3E50'} />
    <Text style={[styles.catLabel, active && styles.catLabelActive]}>{label}</Text>
  </TouchableOpacity>
  );

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
              <CategoryItem icon="grid-outline" label="ALL ITEMS" id={1} active={active == 1 ? true : false}/>
              <CategoryItem icon="shirt-outline" label="TOPS" id={2} active={active == 2 ? true : false}/>
              <CategoryItem icon="square" label="BOTTOMS" id={3} active={active == 3 ? true : false}/>
              <CategoryItem icon="square" label="OUTERWEARS" id={4} active={active == 4 ? true : false}/>
              <CategoryItem icon="square" label="ONE-PIECES" id={5} active={active == 5 ? true : false}/>
              <CategoryItem icon="square" label="SHOES" id={6} active={active == 6 ? true : false}/>
              <CategoryItem icon="square" label="UNDERWEAR" id={7} active={active == 7 ? true : false}/>
              <CategoryItem icon="square" label="ACCESSORIES" id={8} active={active == 8 ? true : false}/>
            </ScrollView>
          </ScrollView>
          <View style={styles.addButtonView}>
            <TouchableOpacity style={styles.addButton} onPress={() => replace('/scan')}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
}