import { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

const Read = ({ navigation }) => {
  const Data = [
    {
      id: "1",
      categorie: "Mexique",
      nom: "Tacos",
      quantite: 10,
      prix: 5,
    },
    {
      id: "2",
      categorie: "USA",
      nom: "Hamburger",
      quantite: 5,
      prix: 10,
    },
  ];
  const [produit, setProduit] = useState(Data);
  const [modalVisible, setModalVisible] = useState(false);

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
    );
  };
  const Modal = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View>
            <View>
              <Text>Hello World!</Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text>Show Modal</Text>
        </Pressable>
      </View>
    );
  };
  w;
  const Produits = ({ id, nom, categorie, quantite, prix }) => {
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
        <Text>{categorie}</Text>
        <Text>{nom}</Text>
        <Text>{quantite}</Text>
        <Text>{prix}</Text>
        <Button title={"---"}></Button>
      </View>
    );
  };
  return (
    <View>
      <Button
        title="Add in stock"
        onPress={() => navigation.navigate("Create")}
      />
      <Details />
      <FlatList
        data={produit}
        renderItem={({ item }) => (
          <Produits
            id={item.id}
            categorie={item.categorie}
            nom={item.nom}
            quantite={!null ? item.quantite : 0}
            prix={!null ? item.prix : 0}
          />
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center", //Centered horizontally
    flexDirection: "row",
    justifyContent: "space-between", //Centered vertically
    borderWidth: 1,
    borderColor: "black",
  },
  text: {
    padding: 5,
  },
});

export default Read;
