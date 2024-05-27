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

const ReadComposition = ({ navigation }) => {
	const [composition, setComposition] = useState();
	const [compositionIdToDelete, setcompositionIdToDelete] = useState();
	const [deleteComposition, setDeleteComposition] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true)

	//Fetch Ingredient
    useEffect(() => {
        axios.get(apiUrl+'/composition')
        .then(function(response){
            if(loading){
                setComposition(response.data.map(item => ({
                    id: item.id,
                    nomIngredient: item.idIngredient.name,
                    nomProduit: item.idProduct.name
                })));
                setLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [loading]);

 	// Delete the composition onPress
	useEffect(() => {
		axios.delete(apiUrl+'/composition/delete/'+compositionIdToDelete)
		.then(function (response) {
			if(deleteComposition){
				setLoading(true)
				setcompositionIdToDelete(false)
				setDeleteComposition(false)
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}, [deleteComposition])

	const Details = () => {
		return (
			<View style={style.produits}>
				<Text style={{ padding: 5 }}>ID</Text>
				<Text style={{ padding: 5 }}>Produit</Text>
				<Text style={{ padding: 5 }}>Ingredient</Text>
				<Text style={{ padding: 5 }}>Action</Text>
			</View>
		);
	};
	const Produits = ({ id, nomProduit, nomIngredient }) => {
		return (
			<ScrollView>
				<View style={style.produits}>
					<Text style={{ padding: 5 }}>{id}</Text>
					<Text style={{ padding: 5 }}>{nomProduit}</Text>
					<Text style={{ padding: 5 }}>{nomIngredient}</Text>

					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
					>
						<View style={style.modalView}>
							<Text>Modifier ou Supprimer : {compositionIdToDelete}</Text>
							<Pressable style={style.button} onPress={() => {setModalVisible(!modalVisible),
								navigation.navigate('ModifyComposition', {id: compositionIdToDelete})}}>
								<Text style={style.textStyle}>Modifier</Text>
							</Pressable>
							<Pressable onPress={() => {
								setModalVisible(!modalVisible);
								setDeleteComposition(true)
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
						setcompositionIdToDelete(id)
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
					title="Ajouter une composition"
					onPress={() => navigation.navigate("CreateComposition")}
				/>

			</View>
			<Details />
			{loading ? (
				<Text>Chargement des compositions en cours...</Text>
			) : (
				<FlatList
					data={composition}
					renderItem={({ item }) => (
						<Produits
							id={item.id}
							nomProduit= {item.nomProduit ? item.nomProduit : 'aucun'}
							nomIngredient={item.nomIngredient ? item.nomIngredient : 'aucun'}

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
export default ReadComposition;