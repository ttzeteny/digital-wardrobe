import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { styles } from '../Styles/DashboardScreen.styles';

interface CategoryItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

interface ActionCardProps {
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

export default function DigitalWardrobeDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder}/>
          <View>
            <Text style={styles.greetingText}>Welcome, back!</Text>
            <Text style={styles.userName}>Username</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle}><IconSymbol name="hanger" size={20} color="#000000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}><IconSymbol name="calendar" size={20} color="#000000" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <View style={styles.featuredBanner}>
          <ImageBackground 
            source={require('../Images/FeaturedBannerImage.png')}
            style={styles.bannerImageBackground}
            imageStyle={styles.bannerImageTexture}
            resizeMode="cover"
          >
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>WARDROBE DIGITIZER</Text>
            <Text style={styles.bannerSub}>Unlock your closet's potential.</Text>
            <Text style={styles.bannerSub}>Start scanning now.</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Scan & Organize</Text>
            </TouchableOpacity>
          </View>
          </ImageBackground>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Manage</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <CategoryItem icon="camera" label="DIGITIZE" active />
          <CategoryItem icon="square.grid.2x2" label="ORGANIZE" />
          <CategoryItem icon="calendar" label="PLAN" />
          <CategoryItem icon="sparkles" label="STYLIST" />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActionsRow}>
          <ActionCard 
            title="Wardrobe Inventory" 
            subtitle="124 Clothes | 45 Acc." 
            color="#FDF5E6" 
            icon="hanger"
          />
          <ActionCard 
            title="Daily Suggestion" 
            subtitle="23°C Sunny | 1 Found" 
            color="#E0F7FA" 
            icon="cloud.sun"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Closet Activity</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <View style={styles.activityCard}>
          <View style={styles.activityImage} />
          <View style={styles.activityInfo}>
            <Text style={styles.activityTag}>Recently Added</Text>
            <Text style={styles.activityItemName}>Linen Shirt</Text>
            <View style={styles.tagRow}>
              <View style={styles.miniTag}><Text style={styles.miniTagText}>Summer</Text></View>
              <View style={styles.miniTag}><Text style={styles.miniTagText}>Green</Text></View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-components for cleaner code
const CategoryItem = ({ icon, label, active }: CategoryItemProps) => (
  <TouchableOpacity style={[styles.catItem, active && styles.catItemActive]}>
    <IconSymbol name={icon as any} size={18} color={active ? '#FFF' : '#2C3E50'} />
    <Text style={[styles.catLabel, active && styles.catLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const ActionCard = ({ title, subtitle, color, icon }: ActionCardProps) => (
  <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]}>
    <IconSymbol name={icon as any} size={24} color="#2C3E50" />
    <Text style={styles.actionTitle}>{title}</Text>
    <Text style={styles.actionSub}>{subtitle}</Text>
  </TouchableOpacity>
);