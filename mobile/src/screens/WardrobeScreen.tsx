import { View, Text, TouchableOpacity, ImageBackground, ScrollView, ActivityIndicator, TextInput, Platform, UIManager, Pressable, Keyboard } from 'react-native';
import { styles } from '../Styles/WardrobeScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useMemo, useState } from 'react';
import { getAuthData } from '../Utils/secureStore';
import { router } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

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

type FilterSection = 'category' | 'brand' | 'color' | 'price';

export default function WardrobeScreen() {
  const [user, setUser] = useState({ username: 'Loading...', email: '' });

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<FilterSection, boolean>>({
    category: true,
    brand: false,
    color: false,
    price: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceOnly, setPriceOnly] = useState(false);

  const toggleSection = (section: FilterSection) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleValueInList = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceOnly(false);
  };

  const handleToggleFilter = () => {
    Keyboard.dismiss();
    setIsFilterOpen(prev => !prev);
  };
  
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

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

  const categoryOptions = useMemo(() => {
    const counts = clothingItems.reduce<Record<string, number>>((acc, item) => {
      const key = item.category?.trim() || 'Uncategorized';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([label, count]) => ({ label, count }));
  }, [clothingItems]);

  const brandOptions = useMemo(() => {
    const counts = clothingItems.reduce<Record<string, number>>((acc, item) => {
      const key = item.brand?.trim() || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([label, count]) => ({ label, count }));
  }, [clothingItems]);

  const colorOptions = useMemo(() => {
    const counts = clothingItems.reduce<Record<string, number>>((acc, item) => {
      const key = item.color?.trim() || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([label, count]) => ({ label, count }));
  }, [clothingItems]);

  const filteredItems = clothingItems.filter(item => {
    const normalizedCategory = item.category?.trim() || 'Uncategorized';
    const normalizedBrand = item.brand?.trim() || 'Unknown';
    const normalizedColor = item.color?.trim() || 'Unknown';

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(normalizedCategory);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(normalizedBrand);
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(normalizedColor);
    const matchesPrice = !priceOnly || (item.price !== null && item.price > 0);

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesColor && matchesPrice && matchesSearch;
  });

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedColors.length > 0 ||
    priceOnly;

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    selectedColors.length +
    (priceOnly ? 1 : 0);

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
                  <TouchableOpacity>
                    <Feather name="settings" size={23} color="#2C3E50" />
                  </TouchableOpacity>
                </View>
          </View>

          <View style={styles.searchBar}>
              <EvilIcons name="search" size={30} color="#2C3E50"/>
              <TextInput 
              placeholder='Search for an item...'
              placeholderTextColor={'#8E8E93'}
              style={styles.searchInput}
              value={searchQuery} 
              onChangeText={setSearchQuery}
              >
        
              </TextInput>
              <Pressable onPress={handleToggleFilter}>
                <Feather name="filter" size={24} color="#2C3E50" />
                {activeFilterCount > 0 ? (
                  <View style={styles.filterBadge}>
                    <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                  </View>
                ) : null}
              </Pressable>
            </View>
            {isFilterOpen ? (
              <View style={styles.filterPanel}>
                <View style={styles.filterHeader}>
                  <Text style={styles.filterTitle}>Filter</Text>
                  <TouchableOpacity onPress={() => setIsFilterOpen(false)}>
                    <Ionicons name="close" size={20} color="#2C3E50" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.filterSectionHeader} onPress={() => toggleSection('category')}>
                  <Text style={styles.filterSectionTitle}>CATEGORY</Text>
                  <Ionicons name={expandedSections.category ? 'chevron-up' : 'chevron-down'} size={18} color="#2C3E50" />
                </TouchableOpacity>
                {expandedSections.category ? (
                  <View style={styles.chipsWrap}>
                    {categoryOptions.map((option) => {
                      const selected = selectedCategories.includes(option.label);
                      return (
                        <TouchableOpacity
                          key={option.label}
                          style={[styles.filterChip, selected && styles.filterChipSelected]}
                          onPress={() => toggleValueInList(option.label, setSelectedCategories)}
                        >
                          <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>
                            {option.label} ({option.count})
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}

                <TouchableOpacity style={styles.filterSectionHeader} onPress={() => toggleSection('brand')}>
                  <Text style={styles.filterSectionTitle}>BRANDS</Text>
                  <Ionicons name={expandedSections.brand ? 'chevron-up' : 'chevron-down'} size={18} color="#2C3E50" />
                </TouchableOpacity>
                {expandedSections.brand ? (
                  <View style={styles.chipsWrap}>
                    {brandOptions.map((option) => {
                      const selected = selectedBrands.includes(option.label);
                      return (
                        <TouchableOpacity
                          key={option.label}
                          style={[styles.filterChip, selected && styles.filterChipSelected]}
                          onPress={() => toggleValueInList(option.label, setSelectedBrands)}
                        >
                          <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>
                            {option.label} ({option.count})
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}

                <TouchableOpacity style={styles.filterSectionHeader} onPress={() => toggleSection('color')}>
                  <Text style={styles.filterSectionTitle}>COLOR</Text>
                  <Ionicons name={expandedSections.color ? 'chevron-up' : 'chevron-down'} size={18} color="#2C3E50" />
                </TouchableOpacity>
                {expandedSections.color ? (
                  <View style={styles.chipsWrap}>
                    {colorOptions.map((option) => {
                      const selected = selectedColors.includes(option.label);
                      return (
                        <TouchableOpacity
                          key={option.label}
                          style={[styles.filterChip, selected && styles.filterChipSelected]}
                          onPress={() => toggleValueInList(option.label, setSelectedColors)}
                        >
                          <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>
                            {option.label} ({option.count})
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}

                <TouchableOpacity style={styles.filterSectionHeader} onPress={() => toggleSection('price')}>
                  <Text style={styles.filterSectionTitle}>PRICE</Text>
                  <Ionicons name={expandedSections.price ? 'chevron-up' : 'chevron-down'} size={18} color="#2C3E50" />
                </TouchableOpacity>
                {expandedSections.price ? (
                  <TouchableOpacity style={styles.checkboxRow} onPress={() => setPriceOnly(!priceOnly)}>
                    <View style={[styles.checkbox, priceOnly && styles.checkboxActive]}>
                      {priceOnly ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
                    </View>
                    <Text style={styles.checkboxLabel}>Show priced items only</Text>
                  </TouchableOpacity>
                ) : null}

                <View style={styles.filterFooter}>
                  <TouchableOpacity onPress={clearFilters}>
                    <Text style={styles.clearAllText}>Clear all</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.showResultsButton} onPress={() => setIsFilterOpen(false)}>
                    <Text style={styles.showResultsText}>Show results ({filteredItems.length})</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
          <View style={styles.itemsContainer}>
            <Text style={styles.sectionTitle}>
              {hasActiveFilters ? `Filtered Items (${filteredItems.length})` : `My Wardrobe (${clothingItems.length})`}
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