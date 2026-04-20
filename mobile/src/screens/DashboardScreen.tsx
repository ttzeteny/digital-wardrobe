import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StatusBar, Image, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { styles } from '../Styles/DashboardScreen.styles';
import { useEffect, useState } from 'react';
import { getAuthData } from '../Utils/secureStore';
import { replace } from 'expo-router/build/global-state/routing';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

/* Interfaces */

interface CategoryItemProps {
  icon: string;
  label: string;
  id: number;
  active?: boolean;
  onPress?: () => void;
}

interface ActionCardProps {
  line1: string;
  line2: string;
  sub1: string;
  sub2: string;
  color: string;
  icon: string;
  iconBackground: string;
  onPress?: () => void;
}

interface ActivityCardProps {
  item: ClothingItemApi;
  imageUrl?: string;
  itemName: string;
  tags: string[];
  dateAdded: string;
}

interface ClothingItemApi {
  id: number;
  name: string;
  tags?: string[];
  imageUrl?: string;
  createdAt?: string;
}

const normalizeImageUri = (raw?: string) => {
  if (!raw) {
    return undefined;
  }

  const cleaned = String(raw).trim().replace(/^"|"$/g, '');
  if (!cleaned || cleaned === 'null') {
    return undefined;
  }

  if (
    cleaned.startsWith('data:image/') ||
    cleaned.startsWith('http://') ||
    cleaned.startsWith('https://') ||
    cleaned.startsWith('file://')
  ) {
    return cleaned;
  }

  const looksLikeBase64 = /^[A-Za-z0-9+/=\r\n]+$/.test(cleaned) && cleaned.length > 120;
  if (looksLikeBase64) {
    const compactBase64 = cleaned.replace(/\r|\n/g, '');
    return `data:image/jpeg;base64,${compactBase64}`;
  }

  return undefined;
};

export default function DigitalWardrobeDashboard() {

  const [active, setActive] = useState(1);
  const [recentItems, setRecentItems] = useState<ClothingItemApi[]>([]);
  const [wardrobeCount, setWardrobeCount] = useState(0);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [recentError, setRecentError] = useState<string | null>(null);

  const CategoryItem = ({ icon, label, id, active, onPress }: CategoryItemProps) => (
  <TouchableOpacity style={[styles.catItem, active && styles.catItemActive]} onPress={() => { setActive(id); if (onPress) onPress(); }}>
    <IconSymbol name={icon as any} size={18} color={active ? '#FFF' : '#2C3E50'} />
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
          email: data.email ?? 'example@example.com',
        });
      }
    };
    loadUserData();
  }, []);

  const loadRecentlyAdded = React.useCallback(async () => {
    setIsLoadingRecent(true);
    setRecentError(null);

    const authData = await getAuthData();
    if (!authData?.token) {
      setRecentError('No auth token found. Please log in again.');
      setIsLoadingRecent(false);
      return;
    }

    const rawToken = String(authData.token);
    const token = rawToken.trim().replace(/^"|"$/g, '');

    try {
      const apiBase = process.env.EXPO_PUBLIC_API_URL;
      if (!apiBase) {
        setRecentError('EXPO_PUBLIC_API_URL is missing in .env');
        setIsLoadingRecent(false);
        return;
      }

      const response = await fetch(`${apiBase}/api/clothes/my-wardrobe?ts=${Date.now()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401 || response.status === 403) {
          setRecentError(`Authorization failed (${response.status}). Please log in again from Settings if needed.`);
          return;
        }
        setRecentError(`Wardrobe fetch failed (${response.status}). ${errorText || 'No error body.'}`);
        setWardrobeCount(0);
        setRecentItems([]);
        return;
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        setRecentError('Unexpected wardrobe response format from API.');
        setWardrobeCount(0);
        setRecentItems([]);
        return;
      }

      const normalized = data.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name ?? 'Unnamed item'),
        tags: Array.isArray(item.tags) ? item.tags.filter((tag: any) => typeof tag === 'string') : [],
        imageUrl: normalizeImageUri(typeof item.imageUrl === 'string' ? item.imageUrl : undefined),
        createdAt: typeof item.createdAt === 'string' ? item.createdAt : undefined,
      })) as ClothingItemApi[];

      setWardrobeCount(normalized.length);
      setRecentItems(normalized.slice(0, 5));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setRecentError(`Failed to load recent wardrobe items: ${message}`);
      setWardrobeCount(0);
      setRecentItems([]);
    } finally {
      setIsLoadingRecent(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadRecentlyAdded();
    }, [loadRecentlyAdded])
  );

  const formatDateAdded = (createdAt?: string) => {
    if (!createdAt) {
      return 'Recently';
    }

    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const dayMs = 1000 * 60 * 60 * 24;
    const days = Math.max(0, Math.floor(diffMs / dayMs));

    if (days === 0) {
      return 'Today';
    }
    if (days === 1) {
      return '1 day ago';
    }
    if (days < 7) {
      return `${days} days ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks === 1) {
      return '1 week ago';
    }
    return `${weeks} weeks ago`;
  };

  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View onTouchEnd={() => replace('/profile')}>
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
          <TouchableOpacity 
            style={styles.iconCircle} 
            onPress={() => router.replace('/(tabs)/wardrobe')}
          >
            <IconSymbol name="hanger" size={20} color="#000000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconCircle}>
            <IconSymbol name="calendar" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        {/* Featured */}
        <View style={styles.featuredBanner}>
          <ImageBackground 
            source={require('../Images/FeaturedBannerImage.png')}
            style={styles.bannerImageBackground}
            imageStyle={styles.bannerImageTexture}
            resizeMode="cover">
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>WARDROBE DIGITIZER</Text>
              <Text style={styles.bannerSub}>Unlock your closet's potential.</Text>
              <Text style={styles.bannerSub}>Start scanning now.</Text>
              <TouchableOpacity style={styles.bannerButton} onPress={() => replace('/scan')}>
                <Text style={styles.bannerButtonText}>
                  Scan & Organize
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Manage</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <CategoryItem icon="camera" label="DIGITIZE" id={1} active={active == 1 ? true : false} onPress={() => router.replace('/scan')}/>
          <CategoryItem icon="square.grid.2x2" label="ORGANIZE" id={2} active={active == 2 ? true : false} onPress={() => router.replace('/(tabs)/wardrobe')}/>
          <CategoryItem icon="calendar" label="PLAN" id={3} active={active == 3 ? true : false}/>
          <CategoryItem icon="sparkles" label="STYLIST" id={4} active={active == 4 ? true : false}/>
        </ScrollView>
        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/menu')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickActionsRow}>
            <QuickActionCard 
              line1="Wardrobe" 
              line2="Inventory" 
              sub1="MY ITEMS:" 
              sub2={`${wardrobeCount} Clothes`} 
              color="#D2B496" 
              icon="hanger"
              iconBackground="#E4D3C6"
              onPress={() => replace('/(tabs)/wardrobe')}
            />
            <QuickActionCard 
              line1="Daily" 
              line2="Suggestion" 
              sub1="TODAY'S LOOK:" 
              sub2="23°C Sunny | 1 Found" 
              color="#E0F7FA" 
              icon="cloud.sun"
              iconBackground="#cce3f3"
            />
          </View>
        </ScrollView>
        {/* Closet Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Closet Activity</Text>
        </View>
        <View style={{ position: 'relative', minHeight: 150 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentItems.length > 0 ? recentItems.map((item) => (
              <ActivityCard
                key={item.id}
                item={item}
                imageUrl={item.imageUrl}
                itemName={item.name}
                tags={item.tags && item.tags.length > 0 ? item.tags : ['No tags']}
                dateAdded={formatDateAdded(item.createdAt)}
              />
            )) : (
              <View style={styles.noActivityContainer}>
                <Text style={[styles.seeAll, { fontSize: 16 }] }>No recent items to display.</Text>
              </View>
            )}
          </ScrollView>
          {isLoadingRecent ? <View style={styles.loadingOverlay}><ActivityIndicator size="large" color="#967662" /></View> : null}
          {recentError ? <Text style={styles.seeAll}>{recentError}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const QuickActionCard = ({ line1, line2, sub1, sub2, color, icon , iconBackground, onPress }: ActionCardProps) => (
  <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]} onPress={onPress}>
    <View style={styles.actionContent}>
      <View style={[styles.actionIconContainer, { backgroundColor: iconBackground }]}>
        <IconSymbol name={icon as any} size={24} color="#2C3E50" />
      </View>
      <View style={styles.actionTextContainer}>
        <Text style={styles.actionTitle}>{line1}</Text>
        <Text style={styles.actionTitle}>{line2}</Text>
      </View>
    </View>
    <View style={styles.actionSubTextContainer}>
      <Text style={styles.actionSub}>{sub1}</Text>     
      <Text style={styles.actionSub}>{sub2}</Text>
    </View>
  </TouchableOpacity>
);

const ActivityCard = ({item, imageUrl, itemName, tags, dateAdded }: ActivityCardProps) => {
  const cleaned = imageUrl && imageUrl !== 'null' ? imageUrl.trim() : '';
  const looksLikeSupportedUri = cleaned.startsWith('data:image/') || cleaned.startsWith('http://') || cleaned.startsWith('https://') || cleaned.startsWith('file://');
  const [imageFailed, setImageFailed] = React.useState(false);

  const useFallback = imageFailed || !looksLikeSupportedUri;

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityImage}>
        {useFallback ? (
          <Image
            source={require('../Images/red_sweater.png')}
            style={styles.activityImageBackground}
            resizeMode="cover"
          />
        ) : (
          <ImageBackground
            source={{ uri: cleaned }}
            style={styles.activityImageBackground}
            imageStyle={styles.activityImageTexture}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </View>
      <View style={styles.activityInfo}>
        <Text style={styles.activityTag}>Recently added</Text>
        <Text style={styles.activityDate}>{dateAdded}</Text>
        <Text style={styles.activityItemName} numberOfLines={1}>{itemName}</Text>
        <View style={styles.tagRow}>
          <View style={styles.miniTag}>
            <Text style={styles.miniTagText}>{tags[0]}</Text>
          </View>
          {tags[1] ? (
            <View style={styles.miniTag}>
              <Text style={styles.miniTagText}>{tags[1]}</Text>
            </View>
          ) : null}
          {tags.length > 2 ? (
            <View style={styles.miniTag}>
              <Text style={styles.miniTagText}>{tags.length - 2} more</Text>
            </View>
          ) : null}
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => router.replace(`/item-details?id=${item.id}`)}>
          <Text style={styles.editButtonText}>Edit details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};