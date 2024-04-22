import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import axios from "axios";
import {SelectList} from "react-native-dropdown-select-list";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const CreateProduct = ({navigation}) => {
	const [Name, setName] = useState('')
	const [Category, setCategory] = useState();
	const [CategoryName, setCategoryName] = useState('')
	const [Price, setPrice] = useState()
	const [Quantity, setQuantity] = useState()
	const [Envoi, setEnvoi] = useState(false)
	const [FetchCategory, setFetchCategory] = useState(true)

	// fetch les categories
	useEffect(() => {
		if (FetchCategory) {
			axios.get(apiUrl + '/category')
			.then(function (response) {
					setCategory(response.data.map(category => category.name))
				}
			).catch(function (error) {
				console.log(error)
			})
			setFetchCategory(false)
		}
	}, [FetchCategory])
// FAIRE UN USE EFFECT QUI AJOUTE TOUT AU PRODUIT A LA FIN SUR LE BOUTON
    useEffect(() => {
        if(Envoi){
            axios.post(apiUrl+'/product/create', {
                "id" : 55,
                "name": Name,
                "price": parseFloat(Price),
                "quantity": parseInt(Quantity),
                "idCategory": {
                    "id" : 5,
                    "name": CategoryName
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
                setEnvoi(false)
            });
        }
    }, [Envoi])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Text style={styles.title}>Ajouter produit</Text>
                {Envoi ?
                    <Text>Bien envoyé !</Text>
                    :
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom du produit"
                            value={Name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Prix du produit"
                            value={Price}
                            onChangeText={(text) => setPrice(text)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantite"
                            value={Quantity}
                            onChangeText={(text) => setQuantity(text)}
                            keyboardType="numeric"
                        />
                        <SelectList
                            setSelected={(val) => setCategoryName(val)}
                            data={Category}
                            save="value"
                        />
                        <TouchableOpacity onPress={() => {
                            setEnvoi(true)
                        }
                        } style={styles.button}>
                            <Text style={{color: '#fff'}}>Créer</Text>
                        </TouchableOpacity>
                    </>
                }
			</View>
		</TouchableWithoutFeedback>
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