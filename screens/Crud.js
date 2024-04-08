import { useState } from 'react'
import { Button, FlatList, Text, View } from 'react-native'

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


  const Produits = ({ nom }) => {
    return(
    <View>
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
      <FlatList
        data={produit}
        renderItem={({ item }) => <Produits nom={item.nom} />}
        keyExtractor={item => item.id}>
      </FlatList>
    </View>
  )
}

export default Crud