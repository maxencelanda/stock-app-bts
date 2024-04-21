import React, { useState } from "react"
import {View, Text} from "react-native";

const Create = ({ }) => {
    const [categorie, setCategorie] = useState('')
    const [nom, setNom] = useState('')
    const [allergene, setAllergene] = useState([])
    const [quantite, setQuantite] = useState(0)
    const [prix, setPrix] = useState(0)

    return (
        <View>
            <Text>Le menu create</Text>
        </View>
    )
}

export default Create