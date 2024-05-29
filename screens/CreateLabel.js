import React, {useEffect, useState} from 'react';
import {
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const CreateLabel = ({navigation}) => {
	const [Name, setName] = useState('')

	useEffect(() => {
		if (FetchCategory) {
			axios.get(apiUrl + '/label')
			.then(function (response) {
					setCategory(response.data.map(category => category.name))
				}
			).catch(function (error) {
				console.log(error)
			})
			setFetchCategory(false)
		}
	}, [FetchCategory])

	useEffect(() => {
		if (Envoi) {
			axios.post(apiUrl + '/Label/create', {
				"id": 55,
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
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.title}>Ajouter un Label</Text>
					{Envoi ?
						<Text>Bien envoyé !</Text>
						:
						<>
							<TextInput
								style={styles.input}
								placeholder="Nom du Label"
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
			</ScrollView>
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

export default CreateLabel;