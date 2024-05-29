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

const ReadLabel = ({ navigation }) => {
	const [Label, setLabel] = useState();
	const [labelIdToDelete, setLabelIdToDelete] = useState();
	const [deleteLabel, setDeleteLabel] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true)

	//Fetch Ingredient
	useEffect(() => {
		axios.get(apiUrl+'/Label')
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

	// Delete the Label onPress
	useEffect(() => {
		axios.post(apiUrl+'/label/delete/'+labelIdToDelete)
		.then(function (response) {
			if(deleteIngredient){
				setLoading(true)
				setLabelIdToDelete(false)
				setDeleteLabel(false)
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
				<Text style={{ padding: 5 }}>Action</Text>
			</View>
		);
	};
	const Produits = ({ id, nom }) => {
		return (
			<ScrollView>
				<View style={style.produits}>
					<Text style={{ padding: 5 }}>{id}</Text>
					<Text style={{ padding: 5 }}>{nom}</Text>

					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
					>
						<View style={style.modalView}>
							<Text>Modifier ou Supprimer : {labelIdToDelete}</Text>
							<Pressable style={style.button} onPress={() => {setModalVisible(!modalVisible),
								navigation.navigate('ModifyLabel', {id: labelIdToDelete})}}>
								<Text style={style.textStyle}>Modifier</Text>
							</Pressable>
							<Pressable onPress={() => {
								setModalVisible(!modalVisible);
								setDeleteLabel(true)
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
					title="Ajouter un label"
					onPress={() => navigation.navigate("CreateLabel")}
				/>

			</View>
			<Details />
			{loading ? (
				<Text>Chargement des labels en cours...</Text>
			) : (
				<FlatList
					data={ingredient}
					renderItem={({ item }) => (
						<Produits
							id={item.id}
							nom={item.name}
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
export default ReadLabel;