import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = () => {
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
      <Text style={styles.title}>Connectez-vous</Text>
      <Text style={styles.subtitle}>Entrez vos identifiants</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Entrez votre adresse mail" 
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput 
        style={styles.input} 
        placeholder="Entrez votre mot de passe" 
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      { loading ? (<ActivityIndicator size="large" color="#0000FF"/>) : 
        (
        <>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={{color: '#fff'}}>Se connecter</Text>
          </TouchableOpacity>

          <View style={styles.register}>
              <Text>Si vous n'avez pas de compte,</Text>
              <TouchableOpacity onPress={() => console.log('Naviguer vers Inscription')}>
                  <Text style={styles.registerText}>Inscrivez-vous</Text>
              </TouchableOpacity>
          </View>
        </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  register: {
    marginTop: 20,
  },
  registerText: {
    color: 'blue',
  },
});

export default LoginScreen;
