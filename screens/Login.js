import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase_auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = firebase_auth;

  const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
        <Text>Login</Text>
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
        { loading ? (<ActivityIndicator size="large" color="#0000FF"/>) : 
        (
            <>
            <Button title="Login" onPress={signIn}/>
            <Button title="Register" onPress={signUp}/>
            </>
        ) }
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})