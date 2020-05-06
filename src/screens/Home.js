/* eslint-disable no-use-before-define */
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
// import TakePhoto from './camera';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('ShareMessage');
  };
  const pressCamera = () => {
    navigation.navigate('TakePhoto');
  };
  const pressFriendsRequest = () => {
    console.log('hi');
    navigation.navigate('FriendsRequest');
  };
  return (

    <View style={styles.container}>
      <Text> Share Your Moment</Text>
      <TouchableOpacity onPress={pressCamera}>
        <FontAwesome name="camera-retro" size={60} style={styles.camera} />
        {/* <Text>Camera icon</Text> */}
        {/* <TakePhoto/> */}
      </TouchableOpacity>
      <View>
        <Text>Be Connected </Text>
        <TouchableOpacity onPress={pressHandler}>
          <FontAwesome name="envelope-o" size={60} style={styles.message} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Be Friends</Text>
        <TouchableOpacity onPress={pressFriendsRequest}  >
          <FontAwesome5 name="user-friends" size={60}  style={styles.friends}/>
        </TouchableOpacity>
        <Text>Be Friends</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 130,
    // height: 100,
    // backgroundColor: '#dbd9c5'
  },
  camera: {
    color:"#a82d1d",
    
   
  },
  message:{
    color: "#948409"
  },
  friends: {
    color: '#d6b40b'
  }
});
