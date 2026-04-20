import { View, Text, TouchableOpacity, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from '../Styles/WardrobeScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getAuthData } from '../Utils/secureStore';
import { router } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ClothingItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  color: string;
  imageUrl: string;
  price: number | null;
  currency: string | null;
}

interface CategoryItemProps {
  icon: string;
  label: string;
  id: number;
  active?: boolean;
}

export default function WardrobeScreen() {
  const [active, setActive] = useState(1);
  const [user, setUser] = useState({ username: 'Loading...', email: '' });

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  const CategoryItem = ({ icon, label, id, active }: CategoryItemProps) => (
  <TouchableOpacity style={[styles.catItem, active && styles.catItemActive]} onPress={() => setActive(id)}>
    <Ionicons name={icon as any} size={18} color={active ? '#FFF' : '#2C3E50'} />
    <Text style={[styles.catLabel, active && styles.catLabelActive]}>{label}</Text>
  </TouchableOpacity>
  );
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const authData = await getAuthData();
        if (authData && authData.token) {
          setUser({
            username: authData.username ?? 'Unknown',
            email: 'example@example.com'
          });

          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/clothes/my-wardrobe`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authData.token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setClothingItems(data);
          } else {
            console.error("Failed to fetch clothes");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingItems(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = clothingItems.filter(item => {
    if (active === 1) return true;
    if (active === 2) return item.category === 'Top';
    if (active === 3) return item.category === 'Bottom';
    if (active === 4) return item.category === 'Outerwear';
    if (active === 5) return item.category === 'One-piece';
    if (active === 6) return item.category === 'Footwear';
    if (active === 7) return item.category === 'Underwear';
    if (active === 8) return item.category === 'Accessory';
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View onTouchEnd={() => router.push('/profile')}>
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
              <CategoryItem icon="square" label="OUTERWEAR" id={4} active={active == 4 ? true : false}/>
              <CategoryItem icon="square" label="ONE-PIECES" id={5} active={active == 5 ? true : false}/>
              <CategoryItem icon="square" label="FOOTWEAR" id={6} active={active == 6 ? true : false}/>
              <CategoryItem icon="square" label="UNDERWEAR" id={7} active={active == 7 ? true : false}/>
              <CategoryItem icon="square" label="ACCESSORIES" id={8} active={active == 8 ? true : false}/>
            </ScrollView>

          <View style={styles.itemsContainer}>
            <Text style={styles.sectionTitle}>
              {active === 1 ? `My Wardrobe (${clothingItems.length})` : `Filtered Items (${filteredItems.length})`}
            </Text>

            {isLoadingItems ? (
              <ActivityIndicator size="large" color="#967662" style={{ marginTop: 50 }} />
            ) : filteredItems.length === 0 ? (
              <Text style={styles.emptyText}>
                {clothingItems.length === 0 
                  ? "Your wardrobe is empty. Tap the + button to add clothes!" 
                  : "No items found in this category."}
              </Text>
            ) : (
              <View style={styles.grid}>
                {filteredItems.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.card}
                    onPress={() => router.replace(`/item-details?id=${item.id}`)}
                  >
                    <View style={styles.imageWrapper}>
                      <ImageBackground 
                        source={{ uri: item.imageUrl }} 
                        style={styles.cardImage}
                        imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                        resizeMode="cover"
                      >
                        {item.price ? (
                          <View style={styles.priceTag}>
                            <Text style={styles.priceText}>{item.price} {item.currency || 'USD'}</Text>
                          </View>
                        ) : null}
                      </ImageBackground>
                    </View>
                    
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardBrand}>{item.brand}</Text>
                      <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          </ScrollView>
    </SafeAreaView>
  );
}