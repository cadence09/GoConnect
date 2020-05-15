/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image
} from 'react-native';
import Firebase from '../../config/Firebase';
import Chat from './Chat';

export default function Friends({ navigation }) {
  const [myFriendsList, setMyFriendsList] = useState([]);
  const { currentUser } = Firebase.auth();


  useEffect(() => {
    const getFriendsList = Firebase.firestore().collection('friends');
    getFriendsList.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
      showFriendsList(tempDoc);
    });
  }, []);

  function showFriendsList(friendsData) {
    const result = [];
    for (let i = 0; i < friendsData.length; i++) {
      if (currentUser.email === friendsData[i].performerEmail) {
        const friends = {
          friendsName: friendsData[i].friendsRequestUserName,
          friendsEmail: friendsData[i].friendsRequestUserEmail,
          friendsUid: friendsData[i].friendsRequestUserUid,
          friendsPic: friendsData[i].friendsRequestPic,
          currentSignUserEmail: friendsData[i].performerEmail,
          currentSignUserName: friendsData[i].performerName,
          currentSignUserUid: friendsData[i].performerUid,
        };
        result.push(friends);
      } else if (currentUser.email === friendsData[i].friendsRequestUserEmail) {
        const friends = {
          friendsName: friendsData[i].performerName,
          friendsEmail: friendsData[i].performerEmail,
          friendsUid: friendsData[i].performerUid,
          friendsPic: friendsData[i].perfomerPic,
          currentSignUserEmail: friendsData[i].friendsRequestUserEmail,
          currentSignUserName: friendsData[i].friendsRequestUserName,
          currentSignUserUid: friendsData[i].friendsRequestUserUid,
        };

        result.push(friends);
      }
    }

    setMyFriendsList(result);
  }

  const pressHandler = (data) => {

    navigation.navigate('Chat', { name: data });
  };

  return (
    <View style={styles.container}>
      {myFriendsList.length === 0 ? (<Text> No friends </Text>)
        : myFriendsList.map((data, i) => (
          <TouchableOpacity onPress={() => pressHandler(data)} style={styles.grid}>

            <Image style={styles.pic} source={{ uri: data.friendsPic }} />

            <Text style={styles.name}>{data.friendsName}</Text>

          </TouchableOpacity>

        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

  },
  grid: {
    flexDirection: 'row',
    marginBottom: 30
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 20,


  },
  pic: {
    height: 50,
    width: 50
  }
});
