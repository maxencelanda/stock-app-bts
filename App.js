import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from "./screens/LoginScreen";
import Home from './screens/Home'
import Create from './screens/Create'
import Read from './screens/Read'
import CrudCreate from './screens/CrudCreate';

const Stack = createNativeStackNavigator()

export default function App() {
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
        <Stack.Screen name='Read' component={Read}></Stack.Screen>
        <Stack.Screen name='Create' component={Create}></Stack.Screen>
        <Stack.Screen name="CrudCreate" component={CrudCreate} />
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
