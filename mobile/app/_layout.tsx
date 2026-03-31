import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getAuthData } from '../src/Utils/secureStore';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const authData = await getAuthData();
      const hasToken = !!(authData && authData.token);
      setIsAuthenticated(hasToken);
      return hasToken;
    } catch (e) {
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const currentPath = segments[0];
    const isAtAuthPage = currentPath === 'main' || currentPath === 'login' || currentPath === 'register';

    const verifyAndRedirect = async () => {
      const isStillAuth = await checkAuth(); 

      if (isStillAuth && (isAtAuthPage || currentPath === undefined)) {
        router.replace('/(tabs)');
      } else if (!isStillAuth && !isAtAuthPage) {
        router.replace('/login');
      }
    };

    verifyAndRedirect();
  }, [segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F5F2' }}>
        <ActivityIndicator size="large" color="#967662" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}