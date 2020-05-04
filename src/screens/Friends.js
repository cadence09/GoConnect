/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Firebase, { db } from '../../config/Firebase';

export default function Friends({ navigation }) {
  const [myFriendsList, setMyFriendsList] = useState([]);
  const { currentUser } = Firebase.auth();
  console.log('who is current', currentUser);
  useEffect(() => {
    const getFriendsList = Firebase.firestore().collection('friends');
    getFriendsList.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
      console.log('what is quersnapshot', tempDoc);
      showFriendsList(tempDoc);
    });
  }, []);

  function showFriendsList(friendsData) {
    const result = [];
    console.log('what is firemdsdata', friendsData);
    for (let i = 0; i < friendsData.length; i++) {
      if (currentUser.email === friendsData[i].performerEmail) {
        const friends = {
          friendsName: friendsData[i].friendsRequestUserName,
          friendsEmail: friendsData[i].friendsRequestUserEmail
        };
        result.push(friends);
      }
    }
    console.log('what is result', result);
    setMyFriendsList(result);
  }
  const pressHandler = () => {
    navigation.navigation('Home');
  };
  console.log('my friemd list,', myFriendsList);
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={pressHandler} />
      <Text>a list of friends </Text> */}
      {myFriendsList.length === 0 ? (<Text> No friends </Text>)
        : myFriendsList.map((data, i) => (
          <View>
            <TouchableOpacity>
              <Text>{data.friendsName}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
