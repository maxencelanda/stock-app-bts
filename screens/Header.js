import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '../firebase';

const auth = getAuth();

const Header = ({ navigation }) => {
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
      <View style={styles.buttonContainer}>
        <Button
          title="Se déconnecter"
          onPress={handleSignOut}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;