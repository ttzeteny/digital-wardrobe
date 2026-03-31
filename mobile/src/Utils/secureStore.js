import * as SecureStore from 'expo-secure-store';

export const saveAuthData = async (token, username) => {   
    try {
        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('userName', username);
    } catch (error) {
        console.error('Error saving auth data:', error);
    }
};

export const getAuthData = async () => {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        const username = await SecureStore.getItemAsync('userName');

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
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userName');
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};