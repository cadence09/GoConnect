import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text, Button,
} from 'react-native';
import Firebase from '../../config/Firebase';

function LogIn({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // Using Firebase signInWithEmailAndPassword method to authenicate a user's email and passowrd
  const handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Home'))
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={onChangePassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account yet? Sign up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 30,
    paddingVertical: 5,
    width: 200
  },
  buttonSignup: {
    fontSize: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },
  inputBox: {
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    fontSize: 16,
    margin: 10,
    padding: 15,
    textAlign: 'center',
    width: '85%'
  
  }
});

export default LogIn;
