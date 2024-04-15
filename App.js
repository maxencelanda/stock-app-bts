<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CrudCreate from './screens/CrudCreate';

const Stack = createStackNavigator();
=======
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './screens/Login'
import Home from './screens/Home'
import Crud from './screens/Crud'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebase_auth } from './firebase'

const Stack = createNativeStackNavigator()
>>>>>>> 1da0fd08f479732c9d99fb88d31e43918e5ebb1c

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator>
        <Stack.Screen name="CrudCreate" component={CrudCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
=======
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Home'>
            {props => <Home {...props} userEmail={user.email} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={Login} />
        )}
        <Stack.Screen name='Crud' component={Crud}></Stack.Screen>
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
>>>>>>> 1da0fd08f479732c9d99fb88d31e43918e5ebb1c
