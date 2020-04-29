/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  View, TouchableOpacity, TextInput, StyleSheet, Image, Button, Alert
} from 'react-native';
import { decode, encode } from 'base-64';
import Firebase, { db } from '../../config/Firebase';
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function Sharing({ navigation, item1 }) {
  const [textValue, onChangeText] = useState('');

  const sendingPhoto = () => {
    // const events = Firebase.firestore().collection('users')
    // events.get().then((querySnapshot) => {
    //     const tempDoc = querySnapshot.docs.map((doc) => {
    //       return doc.data().email
    //     })
 
    const currentUser = Firebase.auth().currentUser;
    const usersData = Firebase.firestore().collection('users');
    const sendToUser = Math.floor(Math.random() * 3);
    usersData.get().then((querySnapshot) => {
      const getUserData = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      //  console.log("what is userData", getUserData, "currentUser", currentUser);
      for (let i = 0; i < getUserData.length; i++) {
        if (currentUser.email === getUserData[i].email) {
          const sendMessage = {
            uri: item1.localUri,
            text: textValue,
            randomNumber: getUserData[i].randomNum,
            sender: currentUser.email,
            receiver: sendToUser,
            senderName: getUserData[i].userName
          };
          if (getUserData[i].randomNum === sendMessage.receiver) {
            // console.log(getUserData[i].randomNum, sendMessage.receiver )
            Alert.alert('Oop sorry, something wrong, please reshare it!')
          } else if (sendMessage !== null) {
          // console.log("what is sendMessage1", sendMessage,"messageLength", messageLength)
            db.collection('photoMessage')
              .doc()
              .set(sendMessage);
            Alert.alert('Photo shared');
            navigation.navigate('Home');
          }
        }
      }
    });
  };

  // const sendingPhoto = () => {
  //   navigation.navigate('Home');
  // };

  return (
    <View>

      <Image source={{ uri: item1.localUri }} style={styles.thumbNail} />
      {/* {console.log("uri",{uri:item1.localUri})} */}
      <TextInput
        style={styles.customTextBox}
        value={textValue}
        onChangeText={(text) => onChangeText(text)}
        multiline
        numberOfLines={4}
        placeholder="Write a caption here"
        placeholderTextColor="black"
      />
      <TouchableOpacity>
        <Button title="Share" onPress={sendingPhoto} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customTextBox: {
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 100,
  },
  thumbNail: {
    height: 300,
    resizeMode: 'contain',
    width: 300,
  }
});
