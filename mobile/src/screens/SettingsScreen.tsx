import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Pressable, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/SettingsScreen.styles';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

export default function SettingsScreen() {

  const handleSave = () => {
    //TODO: Implement actual save logic here (e.g., API call to update user profile)
    router.push('/profile');
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

  /* Date of birth */

  const [day, setDay] = useState('Day');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 127 }, (_, i) => (2026 - i).toString());

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
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>  
        {/* ScrollView */}
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
                //onChangeText=
                placeholderTextColor="#8E8E93"
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput 
                style={styles.input}
                value={"Username"}
                //onChangeText=
                placeholderTextColor="#8E8E93"
                readOnly
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput 
                style={styles.input}
                value={"example@example.com"}
                keyboardType="email-address"
                readOnly
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                style={styles.input}
                //onChangeText=
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
                //onChangeText=
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