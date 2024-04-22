import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { auth } from '../firebase'

export default function Home ({ userEmail, navigation }) {
  console.log('user received: ' + userEmail)
  
  return (
    <View>
        <Text style={styles.title}>ACME STOCK</Text>
        <Button title="Voir les produits" onPress={() => navigation.navigate("Read")} />
        <Button title={"Voir les categories"} onPress={()=> navigation.navigate("ReadCategory")}/>
        <Button title={"Voir les ingredients"} onPress={()=>navigation.navigate("ReadIngredient")}/>
        <Button title={"Voir les compositions"} onPress={()=> navigation.navigate("ReadComposition")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#F0F6CA",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});
