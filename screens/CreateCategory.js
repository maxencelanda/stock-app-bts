import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import axios from "axios";
import {SelectList} from "react-native-dropdown-select-list";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const CreateCategory = ({navigation}) => {
	const [Name, setName] = useState('')
	const [Envoi, setEnvoi] = useState(false)
	const [FetchCategory, setFetchCategory] = useState(false)

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

// envoi la categorie
	useEffect(() => {
		if(Envoi){
			axios.post(apiUrl+'/category/create', {
				"id" : 55,
				"name": Name,
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
				<Text style={styles.title}>Ajouter categorie</Text>
				{Envoi ?
					<Text>Bien envoyé !</Text>
					:
					<>
						<TextInput
							style={styles.input}
							placeholder="Nom de la catégorie"
							value={Name}
							onChangeText={(text) => setName(text)}
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

export default CreateCategory;