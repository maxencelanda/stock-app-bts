import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {SelectList} from "react-native-dropdown-select-list";

const axios = require('axios').default;
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ModifyIngredient = ({route, navigation}) => {
	const {id} = route.params;
	const [Ingredient, setIngredient] = useState();
	const [Name, setName] = useState('')
	const [Allergen, setAllergen] = useState('')
	const [Label, setLabel] = useState('')
	const [Envoi, setEnvoi] = useState(false)
	const [FetchIngredient, setFetchIngredient] = useState(true)


// fetch l'ingredient
	useEffect(() => {
		if (FetchIngredient) {
			axios.get(apiUrl + '/ingredient/' + id)
			.then(function (response) {
				setIngredient(response.data)
				}
			).catch(function (error) {
				console.log(error)
			})

			setFetchIngredient(false)
		}
	}, [FetchIngredient])

 	// Post les données modif
	useEffect(() => {
		if (Envoi) {
			axios.post(apiUrl + '/ingredient/edit', {
				"id": Ingredient.id,
				"name": Name ? Name : Ingredient.name,
				"allergen": Allergen ? Allergen : Ingredient.allergen,
				"label": Label,
			})
			.catch(function (error) {
				console.log(error.response.data);
			});
		}
		setEnvoi(false)
	}, [Envoi]);
 
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Text style={styles.title}>Modifier l'ingredient : {id}</Text>
				<TextInput
					style={styles.input}
					placeholder={Ingredient ? Ingredient.name : ''}
					value={Name}
					onChangeText={(text) => setName(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder={Allergen ? "Allergène : " + Ingredient.allergen : "Pas d'allergène"}
					value={Allergen}
					onChangeText={(text) => setAllergen(text)}
				/>
				<TouchableOpacity onPress={() => {
					setEnvoi(true)
				}
				} style={styles.button}>
					<Text style={{color: '#fff'}}>Modifier</Text>
				</TouchableOpacity>
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

export default ModifyIngredient;
