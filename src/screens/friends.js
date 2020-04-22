import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';


export default function Friends({ navigation }) {
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler} />
      <Text>a list of friends </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
