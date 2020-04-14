import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
// import TakePhoto from './camera';
import { FontAwesome } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('ShareMessage');
  };
  const pressCamera = () => {
    navigation.navigate('TakePhoto');
  };
  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={pressCamera}>
        <FontAwesome name="camera-retro" />
        {/* <Text>Camera icon</Text> */}
        {/* <TakePhoto/> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={pressHandler}>
        <Text>trigger a new page with a thumbnail photo that can share and write description</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
