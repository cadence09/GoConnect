import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text, Alert
} from 'react-native';
import { decode, encode } from 'base-64';
import Firebase, { db } from '../../config/Firebase';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
// import Firebase from '../../config/Firebase';


function Signup({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [name, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await Firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('what is response', response);
      const acctNum = Math.floor(Math.random() * 3);
      console.log(acctNum);
      const newUser = {
        uid: response.user.uid,
        email: response.user.email,
        userName: name,
        randomNum: acctNum
      };
      // eslint-disable-next-line no-unused-expressions
      console.log('new user', newUser)
      / db.collection('users')
        .doc(newUser.uid)
        .set(newUser);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      return Alert.alert('The email has registed!');
    }
  };

  // const handleSignUp = () => {

  //   const events = Firebase.firestore().collection('users')
  // events.get().then((querySnapshot) => {
  //     const tempDoc = querySnapshot.docs.map((doc) => {
  //       return doc.data().email
  //     })


  // }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={name}
        onChangeText={onChangeName}
        placeholder="Full Name"
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
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

export default Signup;
