import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Pressable, Modal, FlatList, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/SettingsScreen.styles';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { getAuthData } from '../Utils/secureStore';

export default function SettingsScreen() {

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [username, setUsername] = useState('Loading...');
  const [email, setEmail] = useState('Loading...');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [bio, setBio] = useState('');

  const [day, setDay] = useState('Day');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 127 }, (_, i) => (2026 - i).toString());

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authData = await getAuthData();
        if (!authData?.token) return;

        setUsername(authData.username || '');
        setEmail(authData.email || '');

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/me`, {
          headers: { 'Authorization': `Bearer ${authData.token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || '');
          setPhoneNumber(data.phoneNumber || '');
          setBio(data.bio || '');
          setCurrency(data.preferredCurrency || 'USD');
          
          if (data.dateOfBirth) {
            const parts = data.dateOfBirth.split(' ');
            if (parts.length === 3) {
              setYear(parts[0]);
              setMonth(parts[1]);
              setDay(parts[2]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    let formattedDOB = null;
    if (year !== 'Year' && month !== 'Month' && day !== 'Day') {
      formattedDOB = `${year} ${month} ${day}`;
    }

    try {
      const authData = await getAuthData();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData?.token}`
        },
        body: JSON.stringify({
          fullName: fullName,
          phoneNumber: phoneNumber,
          dateOfBirth: formattedDOB,
          bio: bio,
          preferredCurrency: currency
        })
      });

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        router.replace('/profile');
      } else {
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Could not connect to the server.");
    } finally {
      setIsSaving(false);
    }
  };

  const pickProfileImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:  [ 'images' ],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        console.log("Selected image:", result.assets[0].uri);
        // Here the image would be cropped, sent to database and set as user's profile picture
      }
  };


  const CustomDropdown = ({options, selectedValue, onSelect} : {options: string[], selectedValue: string, onSelect: Function}) => {
    const [visible, setVisible] = useState(false);

    return (
      <View style={styles.input}>
        <Pressable onPress={() => setVisible(true)}>
          <Text style={styles.inputText}>{selectedValue}</Text>
        </Pressable>

        <Modal visible={visible} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.option} 
                    onPress={() => { onSelect(item); setVisible(false); }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                  )}
                />
              </View>
            </Pressable>
          </Modal>
        </View>
      );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#967662" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => {router.replace('/profile')}}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color="#2C3E50"/>
          </Pressable>
          <Text style={styles.editProfileText}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave} disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator size="small" color="#967662" />
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>  
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.imageWrapper}>
              <View style={styles.placeholderCircle}>
                <Ionicons name="person" size={60} color="#A0A0A0" />
              </View>
              <TouchableOpacity style={styles.editBadge} onPress={() => {pickProfileImage()}}>
                <Ionicons name="camera" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </View>
          {/* Form */}
          <View style={styles.form}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput 
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#8E8E93"
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: '#F2F2F7', color: '#8E8E93' }]}
                value={username}
                readOnly
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: '#F2F2F7', color: '#8E8E93' }]}
                value={email}
                keyboardType="email-address"
                readOnly
              />
            </View>

            {/* Preferred Currency Section */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Currency</Text>
              <View style={styles.currencyRow}>
                {['USD', 'EUR', 'GBP', 'HUF'].map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setCurrency(c)}
                    style={[
                      styles.currencyBtn,
                      currency === c && styles.currencyBtnActive
                    ]}
                  >
                    <Text style={[
                      styles.currencyBtnText,
                      currency === c && styles.currencyBtnTextActive
                    ]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.helperText}>
                This currency will be used for all items and statistics.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#8E8E93"
                placeholder="Enter your phone number"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <View style={styles.row}>
                <CustomDropdown options={days} selectedValue={day} onSelect={setDay} />
                <View style={{ flex: 1 }}>
                  <CustomDropdown options={months} selectedValue={month} onSelect={setMonth} />
                </View>
                <CustomDropdown options={years} selectedValue={year} onSelect={setYear} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Wardrobe Bio</Text>
              <TextInput 
                style={[styles.input, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                placeholderTextColor="#8E8E93"
                placeholder="Tell us about your style..."
              />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}