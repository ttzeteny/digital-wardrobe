import { View, Text, StyleSheet } from 'react-native';
import { styles } from './Style/DashboardScreen.styles';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Your wardrobe overview will be here.</Text>
    </View>
  );
}