import { useEffect, useState } from "react";
import {
	Button,
	FlatList,
	Text,
	View,
	StyleSheet,
	Pressable,
	Modal, SafeAreaView, ScrollView,
} from "react-native";
const axios = require('axios').default;
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ReadCategory = ({ navigation }) => {
	const [categories, setCategories] = useState();
	const [categoriesIdToDelete, setCategoriesIdToDelete] = useState();
	const [deleteCategories, setDeleteCategories] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true)

	//Fetch categories
	useEffect(() => {
		axios.get(apiUrl+'/category')
		.then(function(response){
				if(loading === true){
					console.log(response.data)
					setCategories(response.data)
					setLoading(false)
				}
			}
		).catch(function(error){
			console.log(error)
		})
	}, [loading]);

	// Delete the product onPress
	useEffect(() => {
		axios.post(apiUrl+'/category/delete/'+categoriesIdToDelete)
		.then(function (response) {
			if(deleteCategories){
				setLoading(true)
				setCategoriesIdToDelete(false)
				setDeleteCategories(false)
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}, [deleteCategories])

	const Details = () => {
		return (
			<View style={style.produits}>
				<Text style={{ padding: 5 }}>ID</Text>
				<Text style={{ padding: 5 }}>Nom</Text>
				<Text style={{padding:5}}>Action</Text>
			</View>
		);
	};
	const Category = ({ id, nom }) => {
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
							<Text>Modifier ou Supprimer :</Text>
							<Pressable style={style.button} onPress={() => {setModalVisible(!modalVisible),
								// achanger
								navigation.navigate('ModifyCategory', {id: categoriesIdToDelete})}}>
								<Text style={style.textStyle}>Modifier</Text>
							</Pressable>
							<Pressable onPress={() => {
								setModalVisible(!modalVisible);
								setDeleteCategories(true)
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
						setCategoriesIdToDelete(id)
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
					title="Créer une categorie"
					onPress={() => navigation.navigate("CreateCategory")}
				/>

			</View>
			<Details />
			{loading ? (
				<Text>Chargement des categories en cours...</Text>
			) : (
				<FlatList
					data={categories}
					renderItem={({ item }) => (
						<Category
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
const style = StyleSheet.create({
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
export default ReadCategory;