import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CreateProduct = ({navigation}) => {
  const [Produit, setProduit] = useState([]);
  const [Name, setName] = useState('')
  const [CategoryId, setCategoryId] = useState('');
  const [CategoryName, setCategoryName]= useState('')
  const [Price, setPrice] = useState()
  const [Quantity, setQuantity] = useState()
  const [Envoi, setEnvoi] = useState(false)

// FAIRE UN USE EFFECT QUI AJOUTE TOUT AU PRODUIT A LA FIN SUR LE BOUTON
 useEffect(()=>{
  axios.post('/user', {
    "name": Name,
    "price": Price,
    "quantity": Quantity,
    "idCategory": {
    "id": CategoryId,
    "name": CategoryName
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

 },[Envoi])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du produit"
        value={Name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Id de la Categorie"
          value={CategoryId}
          onChangeText={(text) => setCategoryId(text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Nom de la Categorie"
          value={CategoryName}
          onChangeText={(text) => setCategoryName(text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Prix du produit"
          value={Price}
          onChangeText={(text) => setPrice(text)}
      />
      <TextInput
          style={styles.input}
          placeholder="Nom du produit"
          value={Quantity}
          onChangeText={(text) => setQuantity(text)}
      />
      <TouchableOpacity onPress={()=> {
        setEnvoi(true)
        navigation.navigate("Home")
      }
      }
        style={styles.button}>
        <Text style={{ color: '#fff' }}>Créer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default CreateProduct;