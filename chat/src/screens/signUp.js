import React, { useState } from 'react';
import {
  Text, View, Button, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import Firebase from '../../config/firebase';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('success'))
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput style={styles.inputBox} value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
});
