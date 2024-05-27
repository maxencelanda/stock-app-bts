import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import axios from "axios";
import {SelectList} from "react-native-dropdown-select-list";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const CreateComposition = ({navigation}) => {
	const [productName, setProductName] = useState('')
    const [IngredientName, setIngredientName] = useState();
    const [IngredientId, setIngredientId] = useState();
    const [productId, setProductId] = useState();
	const [Envoi, setEnvoi] = useState(false)
    const [FetchIngredient, setFetchIngredient] = useState(true)
    const [FetchProduct, setFetchProduct] = useState(true)
    const [Ingredient, setIngredient] = useState()
    const [Product, setProduct] = useState()

	// fetch les ingredients
	useEffect(() => {
		if (FetchIngredient) {
			axios.get(apiUrl + '/ingredient')
			.then(function (response) {
                    setIngredient(response.data.map(ingredient => ingredient.name))
				}
			).catch(function (error) {
				console.log(error)
			})
			setFetchIngredient(false)
		}
    }, [FetchIngredient])

    // fetch les produits
	useEffect(() => {
		if (FetchProduct) {
			axios.get(apiUrl + '/product')
			.then(function (response) {
                    setProduct(response.data.map(product => product.name))
				}
			).catch(function (error) {
				console.log(error)
			})
			setFetchProduct(false)
		}
    }, [FetchProduct])
    
// envoi de la composition
    useEffect(() => {
        if(Envoi){
            axios.post(apiUrl + '/composition/create', {
                idProduct: {
                    id: productId,
                    name: productName
                },
                idIngredient: {
                    id: IngredientId,
                    name: IngredientName
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
                setEnvoi(false)
            });
        }
    }, [Envoi]) 

    useEffect(() => {
        if(productId){
            console.log(productId, IngredientId)
        }
},[productId,IngredientId, productName])
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Text style={styles.title}>Ajouter produit</Text>
                {Envoi ?
                    <Text>Bien envoyé !</Text>
                    :
                    <> 
                        <SelectList
                            placeholder='Choisir le nom du produit'
                            setSelected={(obj) => {
                                setProductId(obj.id);
                                setProductName(obj.name);
                            }}
                            data={Product}
                            save="value"
                        />
                        <SelectList
                            placeholder="Choisir le nom de l'ingredient"
                            setSelected={(obj) => {
                                setIngredientId(obj.id);
                                setIngredientName(obj.name);
                            }}
                            data={Ingredient}
                            save="value"
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

export default CreateComposition;