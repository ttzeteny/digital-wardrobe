import { View, Text, StyleSheet } from 'react-native';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text>Settings and options.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
});