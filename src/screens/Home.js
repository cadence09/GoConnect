/* eslint-disable no-use-before-define */
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ImageBackground
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
      <ImageBackground source={require('../images/colorBackground.jpg')} style={{height:600, width:400}}>
      <View style={styles.iconContainer}>
      <Text style={styles.text}> Share Your Moments</Text>
      <TouchableOpacity onPress={pressCamera}>
        <FontAwesome name="camera-retro" size={60} style={styles.camera} />
        {/* <Text>Camera icon</Text> */}
        {/* <TakePhoto/> */}
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>Be Connected </Text>
        <TouchableOpacity onPress={pressHandler}>
          <FontAwesome name="envelope-o" size={60} style={styles.message} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Be Friends</Text>
        <TouchableOpacity onPress={pressFriendsRequest}  >
          <FontAwesome5 name="user-friends" size={60}  style={styles.friends}/>
        </TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafcfa",
  },
  iconContainer: {
    paddingTop: 130
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  camera: {
  
    color:"#a82d1d",
    paddingBottom: 30,
    textAlign: 'center'
   
  },
  message:{
    color: "#7a3687",
    paddingBottom: 30,
    textAlign: 'center'
  },
  friends: {
    color: '#d6b40b',
    paddingBottom: 30,
    textAlign: 'center'
  }
});
