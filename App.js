import React from 'react';
import { StyleSheet, View } from 'react-native';
import RegisterScreen from './screens/RegisterScreen'; 

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
