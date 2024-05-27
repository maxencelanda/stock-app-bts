import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { auth } from '../firebase'
import { platCollection } from '../firestore'
import { getAuth,signOut } from 'firebase/auth'


export default function Home ({ navigation }) {


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
    <View>
        <Text style={styles.title}>ACME STOCK</Text>
        <Button title="Voir les produits" onPress={() => navigation.navigate("Read")} />
        <Button title={"Voir les categories"} onPress={()=> navigation.navigate("ReadCategory")}/>
        <Button title={"Voir les ingredients"} onPress={()=>navigation.navigate("ReadIngredient")}/>
        <Button title={"Voir les compositions"} onPress={()=> navigation.navigate("ReadComposition")}/>
        <Button title={"Se déconnecter"} onPress={()=>handleSignOut()}></Button>
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