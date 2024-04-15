import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './screens/Login'
import Home from './screens/Home'
import Create from './screens/Create'
import Read from './screens/Read'
import Crud from './screens/Crud'
import CrudCreate from './screens/CrudCreate';

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebase_auth } from './firebase'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Home'>
            {props => <Home {...props} userEmail={user.email} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={Login} />
        )}
        <Stack.Screen name='Read' component={Read}></Stack.Screen>
        <Stack.Screen name='Create' component={Create}></Stack.Screen>
        <Stack.Screen name='Crud' component={Crud}></Stack.Screen>
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
