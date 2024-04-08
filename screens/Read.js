import { useState } from 'react'
import { Button, FlatList, Text, View, StyleSheet } from 'react-native'

const Read  = ({ navigation }) => {
  const Data = [
    {
      id: '1',
      categorie:"Mexique",
      nom: 'Tacos'
    },
    {
      id: '2',
      categorie:"USA",
      nom: 'Hamburger',
    }
  ]
  const [produit, setProduit] = useState(Data)

  const Details = () => {
    return (
      <View style={styles.container}>
        <Text>ID</Text>
        <Text>Categorie</Text>
        <Text>Produit</Text>
        <Text>Quantité</Text>
        <Text>Prix</Text>
        <Text>Action</Text>
      </View>
    )
  }
  const Produits = ({ categorie, nom }) => {
    return(
    <View style={styles.container}>
      <Text>{categorie}</Text>
      <Text>{nom}</Text>
    </View>
    )
  }
  return (
    <View>
      <Button
        title='Add in stock'
        onPress={() => navigation.navigate('Create')}
        />
        <Details/>
      <FlatList
        data={produit}
        renderItem={({ item }) => <Produits nom={item.nom} categorie={item.categorie} />}
        keyExtractor={item => item.id}>
      </FlatList>
    </View>
  )
}
const styles= StyleSheet.create({
    container: {
    alignItems: 'center', //Centered horizontally
    flexDirection: 'row',
  },
  text: {
    padding:5
  }
})


export default Crud