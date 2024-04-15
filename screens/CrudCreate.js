import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CrudCreate = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), value: input }]);
    setInput('');
  };

  const deleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD</Text>
      <TextInput
        style={styles.input}
        placeholder="Ajouter un élément"
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity onPress={addItem} style={styles.button}>
        <Text style={{ color: '#fff' }}>Créer</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={(itemData) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{`#${itemData.item.id} ${itemData.item.value}`}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => console.log('Edit')} style={styles.editButton}>
                <Text style={{ color: '#fff' }}>E</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(itemData.item.id)} style={styles.deleteButton}>
                <Text style={{ color: '#fff' }}>D</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
});

export default CrudCreate;
