import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {SelectList} from "react-native-dropdown-select-list";
const axios = require('axios').default;
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ModifyProduct = ({route,navigation}) => {
	const {id} = route.params;
	const [Produit, setProduit] = useState();
	const [Name, setName] = useState('')
	const [CategoryName, setCategoryName]= useState('')
	const [Price, setPrice] = useState()
	const [Quantity, setQuantity] = useState()
	const [Envoi, setEnvoi] = useState(false)
	const [FetchCategory, setFetchCategory] = useState(true)
	const [FetchProduct, setFetchProduct] = useState(true)
	const [Category, setCategory] = useState()


// fetch les categories
	useEffect(()=>{
		if(FetchCategory){
			axios.get(apiUrl+'/category')
			.then(function(response){
					setCategory(response.data.map(category => category.name))
				}
			).catch(function(error){
				console.log(error)
			})
			setFetchCategory(false)
		}
	},[FetchCategory])

// fetch le product
	useEffect(()=>{
		if(FetchProduct){
			axios.get(apiUrl+'/product/'+id)
			.then(function(response){
					setProduit(response.data)
				}
			).catch(function(error){
				console.log(error)
			})
			setFetchProduct(false)
		}
	},[FetchProduct])

	// Post les données modif
	useEffect(() => {
		if (Envoi) {
			sendProductUpdate();
		}
		setEnvoi(false)
	}, [Envoi]);

	const sendProductUpdate = () => {
		axios.post(apiUrl+'/product/edit', {
			"id" : Produit.id,
			"name": Name ? Name : Produit.name,
			"price": Price ? Price : Produit.price,
			"quantity": Quantity ? Quantity : Produit.quantity,
			"idCategory" : {
				"id" : Produit.idCategory.id,
				"name": CategoryName ? CategoryName : Category.name,
			}
		})
		.then(function (response) {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.container}>
			<Text style={styles.title}>Modifier le produit : {id}</Text>
			<TextInput
				style={styles.input}
				placeholder={Produit ? Produit.name : ''}
				value={Name}
				onChangeText={(text) => setName(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder={Produit ? "prix : " +Produit.price.toString() : ''}
				value={Price}
				onChangeText={(text) => setPrice(parseInt(text))}
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.input}
				placeholder={Produit ? "quantite : "+ Produit.quantity.toString() : ''}
				value={Quantity}
				onChangeText={(text) => setQuantity(parseInt(text))}
				keyboardType="numeric"
			/>
			<SelectList
				setSelected={(val) => setCategoryName(val)}
				data={Category}
				save= "value"
			/>
			<TouchableOpacity onPress={()=> {
				setEnvoi(true)
			}
			} style={styles.button}>
				<Text style={{ color: '#fff' }}>Modifier</Text>
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

export default ModifyProduct;
