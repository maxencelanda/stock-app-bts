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

const Read = ({ navigation }) => {
	const [produit, setProduit] = useState();
	const [productIdToDelete, setproductIdToDelete] = useState();
	const [deleteProduct, setDeleteProduct] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true)

	//Fetch products
	useEffect(() => {
		axios.get(apiUrl+'/product')
		.then(function(response){
			if(loading === true){
				console.log(response.data)
				setProduit(response.data)
				setLoading(false)
			}
			}
		).catch(function(error){
			console.log(error)
		})
	}, [loading]);

	// Delete the product onPress
	useEffect(() => {
		axios.post(apiUrl+'/product/delete/'+productIdToDelete)
		.then(function (response) {
			if(deleteProduct){
				setLoading(true)
				setproductIdToDelete(false)
				setDeleteProduct(false)
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}, [deleteProduct])

	const Details = () => {
		return (
			<View style={style.produits}>
				<Text style={{ padding: 5 }}>ID</Text>
				<Text style={{ padding: 5 }}>Categorie</Text>
				<Text style={{ padding: 5 }}>Produit</Text>
				<Text style={{ padding: 5 }}>Quantité</Text>
				<Text style={{ padding: 5 }}>Prix</Text>
				<Text style={{ padding: 5 }}>Action</Text>
			</View>
		);
	};
	const Produits = ({ id, nom, categorie, quantite, prix }) => {
		return (
			<ScrollView>
			<View style={style.produits}>
				<Text style={{ padding: 5 }}>{id}</Text>
				<Text style={{ padding: 5 }}>{categorie}</Text>
				<Text style={{ padding: 5 }}>{nom}</Text>
				<Text style={{ padding: 5}}>{quantite}</Text>
				<Text style={{ padding: 5 }}>{prix}</Text>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
				>
					<View style={style.modalView}>
						<Text>Modifier ou Supprimer : {productIdToDelete}</Text>
						<Pressable style={style.button} onPress={() => {setModalVisible(!modalVisible),
							navigation.navigate('ModifyProduct', {id: productIdToDelete})}}>
							<Text style={style.textStyle}>Modifier</Text>
						</Pressable>
						<Pressable onPress={() => {
							setModalVisible(!modalVisible);
							setDeleteProduct(true)
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
					setproductIdToDelete(id)
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
				title="Add product"
				onPress={() => navigation.navigate("CreateProduct")}
			/>
			<Button
				title="Add category"
				onPress={() => navigation.navigate("CreateProduct")}
			/>
			</View>
			<Details />
			{loading ? (
				<Text>Chargement des produits en cours...</Text>
			) : (
				<FlatList
					data={produit}
					renderItem={({ item }) => (
						<Produits
							id={item.id}
							categorie={item.idCategory.name}
							nom={item.name}
							quantite={item.quantity}
							prix={item.price}
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
export default Read;