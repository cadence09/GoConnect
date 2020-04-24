import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

export default function ShareMessage({ navigation }) {
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View>
      <TouchableOpacity onPress={pressHandler} />
      
    </View>
  );
}
