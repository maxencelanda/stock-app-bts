import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CrudCreate from './screens/CrudCreate';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CrudCreate" component={CrudCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}