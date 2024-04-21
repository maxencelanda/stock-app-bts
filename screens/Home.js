import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { auth } from '../firebase'
import { platCollection } from '../firestore'
import { getAuth } from 'firebase/auth'


export default function Home ({ userEmail, navigation }) {
  console.log('user received: ' + userEmail)

const auth = getAuth();
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Déconnexion réussie');
    })
    .catch((error) => {
      console.error('Erreur lors de la déconnexion : ', error);
    });
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACME STOCK</Text>
      <Text>Connecté en tant que {userEmail}</Text>
      <Button
          title="Go to READ"
          onPress={() => navigation.navigate('Read')}
          style={styles.button}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  title: {
    backgroundColor: '#F0F6CA',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});