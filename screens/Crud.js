import { useState } from 'react'
import { Button, FlatList, Text, View, StyleSheet } from 'react-native'

const Crud  = ({ navigation }) => {
  const Data = [
    {
      id: '1',
      nom: 'Tacos'
    },
    {
      id: '2',
      nom: 'Hamburger'
    }
  ]
  const [produit, setProduit] = useState(Data)

  const Details = () => {
    return (
      <View>
        <Text>ID</Text>
        <Text>Categorie</Text>
        <Text>Produit</Text>
        <Text>Quantité</Text>
        <Text>Prix</Text>
        <Text>Action</Text>
      </View>
    )
  }
  const Produits = ({ nom }) => {
    return(
    <View style={styles.container}>
      <Text></Text>
      <Text>{nom}</Text>
    </View>
    )
  }
  return (
    <View>
      <Text>Crud</Text>
      <Button
        title='Back to home'
        onPress={() => navigation.navigate('Home')}
        />
        <Details/>
      <FlatList
        data={produit}
        renderItem={({ item }) => <Produits nom={item.nom} />}
        keyExtractor={item => item.id}>
      </FlatList>
    </View>
  )
}
const styles= StyleSheet.create({
    container: {
        flex: 1
        
    }
})


export default Crud