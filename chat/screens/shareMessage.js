import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Button, FlatList, TouchableOpacity,
} from 'react-native';

export default function ShareMessage() {
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View>
      <TouchableOpacity onPress={pressHandler} />
      <Text> ShareMessage </Text>
    </View>
  );
}
