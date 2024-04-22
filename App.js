import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from "./screens/LoginScreen";
import Home from './screens/Home'
import CreateProduct from './screens/CreateProduct'
import Read from './screens/Read'
import { onAuthStateChanged } from 'firebase/auth'
import {firebase_auth} from "./firebase";
import RegisterScreen from "./screens/RegisterScreen";
import ModifyProduct from "./screens/ModifyProduct";

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebase_auth, u => {
      console.log('user', u)
      setUser(u)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        {user ? (
          <Stack.Screen name='Home'>
            {props => <Home {...props} userEmail={user.email} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={LoginScreen} />
        )}
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='Read' component={Read}></Stack.Screen>
        <Stack.Screen name='CreateProduct' component={CreateProduct}></Stack.Screen>
        <Stack.Screen name='ModifyProduct' component={ModifyProduct}></Stack.Screen>
       </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
