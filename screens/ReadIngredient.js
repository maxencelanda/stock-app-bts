import { useEffect, useState } from "react";
import {
	Button,
	FlatList,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
	Modal, SafeAreaView, ScrollView,
} from "react-native";
const axios = require('axios').default;
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ReadIngredient = ({ navigation }) => {
	const [ingredient, setIngredient] = useState();
	const [ingredientIdToDelete, setingredientIdToDelete] = useState();
	const [deleteIngredient, setDeleteIngredient] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true)

	//Fetch Ingredient
	useEffect(() => {
		axios.get(apiUrl+'/ingredient')
		.then(function(response){
				if(loading === true){
					setIngredient(response.data)
					setLoading(false)
				}
			}
		).catch(function(error){
			console.log(error)
		})
	}, [loading]);

	// Delete the Ingredient onPress
	useEffect(() => {
		axios.post(apiUrl+'/ingredient/delete/'+ingredientIdToDelete)
		.then(function (response) {
			if(deleteIngredient){
				setLoading(true)
				setingredientIdToDelete(false)
				setDeleteIngredient(false)
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}, [deleteIngredient])

	const Details = () => {
		return (
			<View style={style.produits}>
				<Text style={{ padding: 5 }}>ID</Text>
				<Text style={{ padding: 5 }}>Name</Text>
				<Text style={{ padding: 5 }}>Allergen</Text>
				<Text style={{ padding: 5 }}>Action</Text>
			</View>
		);
	};
	const Produits = ({ id, nom, allergen }) => {
		return (
			<ScrollView>
				<View style={style.produits}>
					<Text style={{ padding: 5 }}>{id}</Text>
					<Text style={{ padding: 5 }}>{nom}</Text>
					<Text style={{ padding: 5 }}>{allergen}</Text>

					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
					>
						<View style={style.modalView}>
							<Text>Modifier ou Supprimer : {ingredientIdToDelete}</Text>
							<Pressable style={style.button} onPress={() => {setModalVisible(!modalVisible),
								navigation.navigate('ModifyIngredient', {id: ingredientIdToDelete})}}>
								<Text style={style.textStyle}>Modifier</Text>
							</Pressable>
							<Pressable onPress={() => {
								setModalVisible(!modalVisible);
								setDeleteIngredient(true)
							}} style={style.button}>
								<Text style={style.textStyle}>Supprimer</Text>
							</Pressable>
							<Pressable style={style.button} onPress={()=> setModalVisible(false)}>
								<Text style={style.textStyle}>Retour arriere</Text>
							</Pressable>
						</View>
					</Modal>
					<Pressable onPress={() => {
						setModalVisible(true);
						setingredientIdToDelete(id)
					}
					}>
						<Text style={{ padding: 5, color:"blue" }}>Details</Text>
					</Pressable>
				</View>
			</ScrollView>
		);
	};
	return (
		<SafeAreaView style={style.container}>

			<View style={style.alignVertical}>
				<Button
					title="Ajouter un ingredient"
					onPress={() => navigation.navigate("CreateIngredient")}
				/>

			</View>
			<Details />
			{loading ? (
				<Text>Chargement des ingredient en cours...</Text>
			) : (
				<FlatList
					data={ingredient}
					renderItem={({ item }) => (
						<Produits
							id={item.id}
							nom={item.name}
							allergen={item.allergen ? item.allergen : 'aucun'}

						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			)}
		</SafeAreaView>
	);
};
const style= StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	produits: {
		width: 380,
		flexDirection: "row",
		justifyContent: "space-around",
		borderBottomWidth: 1,
		padding:3,
	},
	alignVertical: {
		flexDirection: "row",
	},
	//css du modal, rien à foutre cest copilot qui la fait
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		backgroundColor: "#2196F3", // Change this to your preferred color
	},
	buttonClose: {
		backgroundColor: "#2196F3", // Change this to your preferred color
	},
});
export default ReadIngredient;