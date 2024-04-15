import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { auth } from "../firebase";
import { platCollection } from "../firestore";

export default function Home({ userEmail, navigation }) {
  console.log("user received: " + userEmail);

  return (
    <View>
      <Text style={styles.title}>ACME STOCK</Text>
      <Text>Logged in as {userEmail}</Text>
      <Text>{platCollection}</Text>
      <Button title="Go to Read" onPress={() => navigation.navigate("Read")} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#F0F6CA",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});
