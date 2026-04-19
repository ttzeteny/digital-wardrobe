import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  Alert, ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { getAuthData } from '../Utils/secureStore';
import { styles } from '../Styles/ItemDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [initName, setInitName] = useState('');
  const [initCategory, setInitCategory] = useState('');
  const [initBrand, setInitBrand] = useState('');
  const [initColor, setInitColor] = useState('');
  const [initSize, setInitSize] = useState('');
  const [initPrice, setInitPrice] = useState('');
  const [initCurrency, setInitCurrency] = useState('USD');

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const authData = await getAuthData();
        if (!authData?.token) return;

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/clothes/${id}`, {
          headers: { 'Authorization': `Bearer ${authData.token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name || '');
          setInitName(data.name || '');
          setCategory(data.category || '');
          setInitCategory(data.category || '');
          setBrand(data.brand || '');
          setInitBrand(data.brand || '');
          setColor(data.color || '');
          setInitColor(data.color || '');
          setSize(data.size || '');
          setInitSize(data.size || '');
          setPrice(data.price ? data.price.toString() : '');
          setInitPrice(data.price ? data.price.toString() : '');
          setCurrency(data.currency || 'HUF');
          setInitCurrency(data.currency || 'HUF');
          setImageUrl(data.imageUrl || '');
        } else {
          Alert.alert("Error", "Could not load item details.");
          router.replace('/(tabs)/wardrobe');
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  const comparer = (a: string, b: string) => {
    if (a === b) return 0;
    else return 1;
  };
  const anyUpdated = comparer(name, initName) || comparer(category, initCategory) || comparer(brand, initBrand) || comparer(color, initColor) || comparer(size, initSize) || comparer(price, initPrice) || comparer(currency, initCurrency);

  const handleUpdate = async () => {
    if (!name || !category) {
      Alert.alert("Hiba", "Név és kategória megadása kötelező!");
      return;
    }
    if (!anyUpdated) {
      router.replace('/(tabs)/wardrobe');
      return;
    }

    setIsSaving(true);
    try {
      const authData = await getAuthData();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/clothes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData?.token}`
        },
        body: JSON.stringify({
          name, category, brand, color, size,
          price: price ? parseFloat(price) : null,
          currency: price ? currency : null,
          imageUrl
        })
      });

      if (response.ok) {
        Alert.alert("Success", "Item updated successfully!");
        router.replace('/(tabs)/wardrobe');
      } else {
        Alert.alert("Error", "Failed to update item.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to remove this item from your wardrobe?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive",
        onPress: async () => {
          try {
            const authData = await getAuthData();
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/clothes/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${authData?.token}` }
            });
            if (response.ok) {
              router.replace('/(tabs)/wardrobe');
            }
          } catch (error) {
            Alert.alert("Error", "Could not delete item.");
          }
        }
      }
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#967662" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Item Details</Text>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <ImageBackground 
            source={{ uri: imageUrl }} 
            style={styles.imageBox}
            imageStyle={{ borderRadius: 20 }}
            resizeMode="cover"
          />

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput style={[styles.textInput, comparer(name, initName) ? { backgroundColor: '#F8F9FA' , borderColor: '#007AFF'} : {}]} value={name} onChangeText={(text) => { setName(text) }}/>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                    {['Top', 'Bottom', 'Outerwear', 'One-piece', 'Footwear', 'Underwear', 'Accessory'].map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setCategory(cat)}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 18,
                                borderRadius: 20,
                                backgroundColor: category === cat ? '#967662' : '#F2F2F7',
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: category === cat ? '#967662' : '#E5E5EA'
                            }}
                        >
                            <Text style={{ 
                                color: category === cat ? '#FFF' : '#8E8E93', 
                                fontWeight: 'bold', 
                                fontSize: 13 
                            }}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Brand</Text>
                <TextInput style={[styles.textInput, comparer(brand, initBrand) ? { backgroundColor: '#F8F9FA' , borderColor: '#007AFF'} : {}]} value={brand} onChangeText={(text) => { setBrand(text) }} />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Color</Text>
                <TextInput style={[styles.textInput, comparer(color, initColor) ? { backgroundColor: '#F8F9FA' , borderColor: '#007AFF'} : {}]} value={color} onChangeText={(text) => { setColor(text) }} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Size</Text>
              <TextInput style={[styles.textInput, comparer(size, initSize) ? { backgroundColor: '#F8F9FA' , borderColor: '#007AFF'} : {}]} value={size} onChangeText={(text) => { setSize(text) }} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput 
                style={[styles.textInput, comparer(price, initPrice) ? { backgroundColor: '#F8F9FA' , borderColor: '#007AFF'} : {}]} 
                value={price} 
                onChangeText={(text) => { setPrice(text) }} 
                keyboardType="numeric" 
              />
              
              <View style={styles.currencyRow}>
                {['HUF', 'EUR', 'USD', 'GBP'].map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setCurrency(c)}
                    style={[styles.currencyBtn, currency === c && styles.currencyBtnActive]}
                  >
                    <Text style={[styles.currencyBtnText, currency === c && styles.currencyBtnTextActive]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.updateButton} 
              onPress={handleUpdate} 
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.updateButtonText}>{anyUpdated ? 'Update Item' : 'Close'}</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}