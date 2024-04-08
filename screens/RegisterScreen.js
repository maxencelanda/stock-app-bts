import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // logique d'inscription
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscrivez-vous</Text>
      <Text style={styles.subtitle}>Entrez vos identifiants</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Entrez votre adresse mail" 
        onChangeText={setEmail} 
        value={email}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Entrez votre mot de passe" 
        secureTextEntry
        onChangeText={setPassword} 
        value={password}
      />
      <TouchableOpacity onPress={register} style={styles.button}>
          <Text style={{color: '#fff'}}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
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
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default RegisterScreen;
