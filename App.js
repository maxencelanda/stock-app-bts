import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Header from './screens/Header';
import LoginScreen from "./screens/LoginScreen";
import Home from './screens/Home'
import Create from './screens/Create'
import Read from './screens/Read'
import { onAuthStateChanged } from 'firebase/auth'
import {firebase_auth} from "./firebase";
import RegisterScreen from "./screens/RegisterScreen";

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
        <Stack.Screen options={{ headerShown: false }} name='Create' component={Create}></Stack.Screen>
      </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
} else {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Header/>
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
        <Stack.Screen options={{ headerShown: false }} name='Create' component={Create}></Stack.Screen>
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
    backgroundColor: '#fff',
  },
});