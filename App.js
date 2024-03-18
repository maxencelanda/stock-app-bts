import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './firebase';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      console.log("user", user.email);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">   
        {user ? 
        (
          <Stack.Screen name="Home" user={user} component={Home} />
        )
        :
        <Stack.Screen name="Login" component={Login} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});