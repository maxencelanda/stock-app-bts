import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {SelectList} from "react-native-dropdown-select-list";

const axios = require('axios').default;
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ModifyCategory = ({route, navigation}) => {
	const {id} = route.params;
	const [Envoi, setEnvoi] = useState(false)
	const [FetchCategory, setFetchCategory] = useState(true)
	const [CategoryName, setCategoryName] = useState()


	useEffect(() => {
		if (FetchCategory) {
			axios.get(apiUrl+'/category')
			.then(function (response) {
				const foundCategory = response.data.find((category)=> category.id === id);
				setCategoryName(foundCategory);
			})
			.catch(function (error) {
				console.log(error)
			})
			setFetchCategory(false)
		}
	}, [FetchCategory])


	// Post les données modif
	useEffect(() => {
		if (Envoi) {
			axios.post(apiUrl + '/category/edit', {
				"id": id,
				"name": CategoryName,
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
				<Text style={styles.title}>Modifier le category : {id}</Text>
				<TextInput
					style={styles.input}
					placeholder= {CategoryName.name ? CategoryName.name : 'test'}
					value={CategoryName}
					onChangeText={(text) => setCategoryName(text)}
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

export default ModifyCategory;
