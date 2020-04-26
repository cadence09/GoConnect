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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
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
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonSignup: {
    fontSize: 12
  }
});

export default Signup;

