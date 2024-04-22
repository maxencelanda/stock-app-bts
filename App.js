import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Header from './screens/Header';
import LoginScreen from "./screens/LoginScreen";
import Home from './screens/Home'
import CreateProduct from './screens/CreateProduct'
import Read from './screens/Read'
import { onAuthStateChanged } from 'firebase/auth'
import {firebase_auth} from "./firebase";
import RegisterScreen from "./screens/RegisterScreen";
import ModifyProduct from "./screens/ModifyProduct";
import CreateCategory from "./screens/CreateCategory";
import ReadCategory from "./screens/ReadCategory";
import ModifyCategory from "./screens/ModifyCategory";
import ReadIngredient from "./screens/ReadIngredient";
import CreateIngredient from "./screens/CreateIngredient";
import ModifyIngredient from "./screens/ModifyIngredient";

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebase_auth, u => {
      console.log('user', u)
      setUser(u)
    })
  }, [])

  if (!user){
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Stack.Navigator initialRouteName='LoginScreen'>
        {user ? (
          <Stack.Screen options={{ headerShown: false }} name='Home'>
            {props => <Home {...props} userEmail={user.email} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        )}
        <Stack.Screen options={{ headerShown: false }} name='Register' component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name='Read' component={Read}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name='CreateProduct' component={CreateProduct}></Stack.Screen>
      </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
} else {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Stack.Navigator initialRouteName='LoginScreen'>
        {user ? (
          <Stack.Screen options={{ headerShown: false }} name='Home'>
            {props => <>
              <Header/>
              <Home {...props} userEmail={user.email} />
            </>}
          </Stack.Screen>
        ) : (
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        )}
        <Stack.Screen options={{ headerShown: false }} name='Register' component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name='Read' component={Read}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name='CreateProduct' component={CreateProduct}></Stack.Screen>
        <Stack.Screen name='ModifyProduct' component={ModifyProduct}></Stack.Screen>
        <Stack.Screen name={'CreateCategory'} component={CreateCategory}></Stack.Screen>
        <Stack.Screen name={'ReadCategory'} component={ReadCategory}></Stack.Screen>
        <Stack.Screen name={'ModifyCategory'} component={ModifyCategory}></Stack.Screen>
        <Stack.Screen name={'ReadIngredient'} component={ReadIngredient}></Stack.Screen>
        <Stack.Screen name={'CreateIngredient'} component={CreateIngredient}></Stack.Screen>
        <Stack.Screen name={'ModifyIngredient'} component={ModifyIngredient}></Stack.Screen>
       </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
} 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    backgroundColor: '#fff',
  },
});