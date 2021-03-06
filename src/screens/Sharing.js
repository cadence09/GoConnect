/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {

  }, []);
  const sendingPhoto = () => {
    let message;
    const { currentUser } = Firebase.auth();
    const usersData = Firebase.firestore().collection('users');
    // let receiverRandomNum = Math.floor(Math.random() * 2);
    const receiverRandomNum = 0;
    usersData.get().then((querySnapshot) => {
      const getUserData = querySnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < getUserData.length; i++) {
        if (currentUser.email === getUserData[i].email) {
          message = {
            uri: item1.localUri,
            text: textValue,
            randomNumber: getUserData[i].randomNum,
            uid: getUserData[i].uid,
            sender: currentUser.email,
            createdAt: Date.now(),
            senderProfilePic: getUserData[i].profilePicture.localUri,
            receiver: receiverRandomNum,
            senderName: getUserData[i].userName
          };
        }
      }
      if (message.randomNumber === message.receiver) {
        const newNum = getNewNum(message.randomNumber, message.receiver);
        console.log('final', newNum);
        message.receiver = newNum;
        db.collection('photoMessage')
          .doc()
          .set(message);
        Alert.alert('Photo shared');
        navigation.navigate('Home');
      } else if (message !== null) {
        db.collection('photoMessage')
          .doc()
          .set(message);
        Alert.alert('Photo shared');
        navigation.navigate('Home');
      }
    });
  };

  function getNewNum(senderNum, receiverNum) {
    if (senderNum !== receiverNum) {
      return receiverNum;
    }
    receiverNum = Math.floor(Math.random() * 2);

    return getNewNum(senderNum, receiverNum);
  }

  return (
    <View>

      <Image source={{ uri: item1.localUri }} style={styles.thumbNail} />
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
