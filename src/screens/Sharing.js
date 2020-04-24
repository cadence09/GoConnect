/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  View, TouchableOpacity, TextInput, StyleSheet, Image, Button
} from 'react-native';

export default function Sharing({ item1 }) {
  const [textValue, onChangeText] = useState('');

  const sendingPhoto = () => {
    console.log({ uri: item1.localUri }, textValue);
    const sendMessage={
      uri: item1.localUri, 
      text: textValue
    }
    console.log("uri and text", sendMessage.uri, sendMessage.text)
    if (sendMessage !== null){
       const test= Math.random(uid)
    }
  }
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
  thumbNail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  customTextBox: {
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 100,
  }
});

