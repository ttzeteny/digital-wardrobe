import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';
const USERNAME_KEY = 'userName';

const setItem = async (key, value) => {
    const safeValue = String(value ?? '');

    await AsyncStorage.setItem(key, safeValue);

    try {
        await SecureStore.setItemAsync(key, safeValue);
    } catch (error) {
        // AsyncStorage value is already written above.
    }
};

const getItem = async (key) => {
    try {
        const secureValue = await SecureStore.getItemAsync(key);
        if (secureValue !== null) {
            await AsyncStorage.setItem(key, secureValue);
            return secureValue;
        }
    } catch (error) {
        // Fall back to AsyncStorage below.
    }

    return AsyncStorage.getItem(key);
};

const deleteItem = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        // Fall back to AsyncStorage cleanup below.
    }

    await AsyncStorage.removeItem(key);
};

export const saveAuthData = async (token, username) => {   
    try {
        const normalizedToken = String(token ?? '').trim().replace(/^"|"$/g, '');
        await setItem(TOKEN_KEY, normalizedToken);
        await setItem(USERNAME_KEY, username);
        return true;
    } catch (error) {
        console.error('Error saving auth data:', error);
        return false;
    }
};

export const getAuthData = async () => {
    try {
        const token = await getItem(TOKEN_KEY);
        const username = await getItem(USERNAME_KEY);

        if (token !== null) {
            return { token, username };
        }
        return null;
    } catch (error) {
        console.error('Error retrieving auth data:', error);
        return null;
    }
};

export const clearAuthData = async () => {
    try {
        await deleteItem(TOKEN_KEY);
        await deleteItem(USERNAME_KEY);
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};