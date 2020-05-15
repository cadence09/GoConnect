import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text, Alert
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
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
  const [cameraRoll, setCameraRoll] = useState(null);
  const [profilePic, setProfilePic] = useState('');

  const handleSignUp = async () => {
    try {
      //
      const response = await Firebase.auth().createUserWithEmailAndPassword(email, password);
      const acctNum = Math.floor(Math.random() * 3);
      const newUser = {
        uid: response.user.uid,
        email: response.user.email,
        userName: name,
        randomNum: acctNum,
        profilePicture: profilePic
      };
      // eslint-disable-next-line no-unused-expressions
      db.collection('users')
        .doc(newUser.uid)
        .set(newUser);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      return Alert.alert('The email has registed!');
    }
  };

  const handleProfilePic = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      setCameraRoll(true);
      handleStoringAvarta();
    } else {
      setCameraRoll(false);
      Alert.alert('Need Permission to access the camera roll in order to upload profile picture');
    }
  };

  async function handleStoringAvarta() {
    if (cameraRoll === true) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      setProfilePic({ localUri: result.uri });
    }
  }


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
      {/* <Button title="Upload Profile Picture" onPress={handleProfilePic}/> */}
      <TouchableOpacity onPress={handleProfilePic}>
        <Text>Upload Profile Picture</Text>
      </TouchableOpacity>
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
