import React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { styles } from '../Styles/DashboardScreen.styles';

interface CategoryItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

interface ActionCardProps {
  line1: string;
  line2: string;
  sub1: string;
  sub2: string;
  color: string;
  icon: string;
  iconBackground: string;
}

interface ActivityCardProps {
  image: any;
  itemName: string;
  tags: string[];
  dateAdded: string;
}

export default function DigitalWardrobeDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <ImageBackground
            source={require('../Images/avatar.png')}
            style={styles.avatarPlaceholder}
            imageStyle={{ borderRadius: 22.5 }}
            resizeMode="cover"
          />
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
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <CategoryItem icon="camera" label="DIGITIZE" active />
          <CategoryItem icon="square.grid.2x2" label="ORGANIZE" />
          <CategoryItem icon="calendar" label="PLAN" />
          <CategoryItem icon="sparkles" label="STYLIST" />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickActionsRow}>
            <QuickActionCard 
              line1="Wardrobe" 
              line2="Inventory" 
              sub1="MY ITEMS:" 
              sub2="124 Clothes | 45 Acc." 
              color="#D2B496" 
              icon="hanger"
              iconBackground="#E4D3C6"
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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Closet Activity</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ActivityCard 
            image={<ImageBackground
              source={require('../Images/blue_jeans.png')}
              style={styles.activityImageBackground}
              imageStyle={styles.activityImageTexture}
              resizeMode="cover"
            />} 
            itemName="Blue Denim Jeans"
            tags={["Jeans", "Denim", "Blue", "Bottoms", "Casual"]}
            dateAdded="2 days ago"
          />
          <ActivityCard 
            image={<ImageBackground
              source={require('../Images/red_sweater.png')}
              style={styles.activityImageBackground}
              imageStyle={styles.activityImageTexture}
              resizeMode="cover"
            />} 
            itemName="Red Sweater"
            tags={["Sweater", "Red", "Casual"]}
            dateAdded="1 week ago"
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const CategoryItem = ({ icon, label, active }: CategoryItemProps) => (
  <TouchableOpacity style={[styles.catItem, active && styles.catItemActive]}>
    <IconSymbol name={icon as any} size={18} color={active ? '#FFF' : '#2C3E50'} />
    <Text style={[styles.catLabel, active && styles.catLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const QuickActionCard = ({ line1, line2, sub1, sub2, color, icon , iconBackground}: ActionCardProps) => (
  <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]}>
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

const ActivityCard = ({image, itemName, tags, dateAdded}: ActivityCardProps) => (
  <View style={styles.activityCard}>
    <View style={styles.activityImage}>{image}</View>
      <View style={styles.activityInfo}>
        <Text style={styles.activityTag}>Recently added</Text>
        <Text style={styles.activityDate}>{dateAdded}</Text>
        <Text style={styles.activityItemName}>{itemName}</Text>
        <View style={styles.tagRow}>
          <View style={styles.miniTag}>
            <Text style={styles.miniTagText}>{tags[0]}</Text>
          </View>
          <View style={styles.miniTag}>
            <Text style={styles.miniTagText}>{tags[1]}</Text>
          </View>
          <View style={styles.miniTag}>
            <Text style={styles.miniTagText}>{tags.length - 2} more</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit details</Text>
        </TouchableOpacity>
      </View>
    </View>
);

const TagList = ({ tags }: { tags: string[] }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const intialTags = tags.slice(0, 2);
    const remainingTags = tags.slice(2);
    
    return (
      <View style={styles.tagRow}>
        {intialTags.map((tag, index) => (
          <View style={styles.miniTag} key={index}>
            <Text style={styles.miniTagText}>{tag}</Text>
          </View>
        ))}
        {isExpanded && remainingTags.map((tag, index) => (
          <View style={styles.miniTag} key={index + 2}>
            <Text style={styles.miniTagText}>{tag}</Text>
          </View>
        ))}
        {!isExpanded && (
          <TouchableOpacity style={styles.miniTag} onPress={() => setIsExpanded(true)}>
            <Text style={styles.miniTagText}>{remainingTags.length} more</Text>
          </TouchableOpacity>
        )}
      </View>
  );
};