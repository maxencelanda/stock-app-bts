import React, {useEffect, useState} from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const CreateIngredient = ({}) => {
	const [Name, setName] = useState('')
	const [Allergen, setAllergen] = useState('')
	const [Envoi, setEnvoi] = useState(false)
	const [FetchCategory, setFetchCategory] = useState(false)

	// fetch les ingredient
	useEffect(() => {
		if (FetchCategory) {
			axios.get(apiUrl + '/ingredient')
			.then(function (response) {
					setCategory(response.data.map(category => category.name))
				}
			).catch(function (error) {
				console.log(error)
			})
			setFetchCategory(false)
		}
	}, [FetchCategory])

// envoi l'ingredient
	useEffect(() => {
		if (Envoi) {
			axios.post(apiUrl + '/ingredient/create', {
				"id": 55,
				"name": Name,
				"allergen": Allergen ? Allergen : ' '
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
					<Text style={styles.title}>Ajouter un ingrédient</Text>
					{Envoi ?
						<Text>Bien envoyé !</Text>
						:
						<>
							<TextInput
								style={styles.input}
								placeholder="Nom de l'ingredient"
								value={Name}
								onChangeText={(text) => setName(text)}
							/>
							<TextInput
								style={styles.input}
								placeholder="Nom de l'allergène"
								value={Allergen}
								onChangeText={(text) => setAllergen(text)}
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

export default CreateIngredient;