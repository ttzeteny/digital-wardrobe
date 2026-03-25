import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../Styles/MenuScreen.styles';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text>Settings and options.</Text>
    </View>
  );
}