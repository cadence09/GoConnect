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
      <TouchableOpacity onPress={pressCamera}>
        <FontAwesome name="camera-retro" size={60} />
        {/* <Text>Camera icon</Text> */}
        {/* <TakePhoto/> */}
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={pressHandler}>
          <FontAwesome name="envelope-o" size={60} />
        </TouchableOpacity>
        <Text>Incoming Message </Text>
      </View>
      <View>
        <TouchableOpacity onPress={pressFriendsRequest}>
          <FontAwesome5 name="user-friends" size={60} />
        </TouchableOpacity>
        <Text>Request</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
