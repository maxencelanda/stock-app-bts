import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {SelectList} from "react-native-dropdown-select-list";

const axios = require('axios').default;
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ModifyLabel = ({route, navigation}) => {
	const {id} = route.params;
	const [Label, setLabel] = useState();
	const [Name, setName] = useState('')
	const [Envoi, setEnvoi] = useState(false)
	const [FetchLabel, setFetchLabel] = useState(true)


// fetch le label
	useEffect(() => {
		if (FetchLabel) {
			axios.get(apiUrl + '/Label/' + id)
			.then(function (response) {
				setLabel(response.data)
				}
			).catch(function (error) {
				console.log(error)
			})

			setFetchLabel(false)
		}
	}, [FetchLabel])

 	// Post les données modif
	useEffect(() => {
		if (Envoi) {
			axios.post(apiUrl + '/Label/edit', {
				"id": Label.id,
				"name": Name ? Name : Label.name,
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
				<Text style={styles.title}>Modifier le Label : {id}</Text>
				<TextInput
					style={styles.input}
					placeholder={Ingredient ? Label.name : ''}
					value={Name}
					onChangeText={(text) => setName(text)}
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

export default ModifyLabel;