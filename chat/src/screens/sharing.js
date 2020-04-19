import React, {useState} from 'react';
import {
    View, TouchableOpacity,TextInput, StyleSheet,Image
  } from 'react-native';

  export default function Sharing({item1}){
      const [textValue, onChangeText] =useState('')
    return (
        <View>
          
          <Image source={{uri:item1.localUri}} style={styles.thumbNail}/>
          <TextInput 
          style={styles.customTextBox} 
          value={textValue} 
          onChangeText={text=>onChangeText(text)} 
          multiline={true} 
          numberOfLines={4}
          placeholder={'Write a caption here'} 
          placeholderTextColor={'black'}/>
          
        </View>
    )
  }

  const styles=StyleSheet.create({
    thumbNail:{
      width:300,
      height:300,
      resizeMode:'contain',
    },
    customTextBox:{
       borderColor:'black',
       borderRadius:10,
       borderStyle:'solid',
       borderWidth:1,
       height:100,
      }
  })