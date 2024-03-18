import { StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../firebase';
import { platCollection } from '../firestore';

export default function Home({ user }) {

  console.log(user)

  return (
    <View>
      <Text style={styles.title}>ACME STOCK</Text>
      <Text>Logged in as {user}</Text>
      <Text>{platCollection}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#F0F6CA',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});