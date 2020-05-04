import React, { useState, useEffect } from 'react';
import {
  View, Alert, Text, TouchableOpacity
} from 'react-native';

import Firebase, { db } from '../../config/Firebase';


export default function FriendsRequest() {
  const [friendsListRequest, setFriendsListRequest] = useState([]);
  const { currentUser } = Firebase.auth();


  useEffect(() => {
    const getBeFriendsReqeust = Firebase.firestore().collection('beFriendsRequest');
    getBeFriendsReqeust.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
      console.log('waht is temp', tempDoc);
      getFriendsRequestList(tempDoc);
    });
  }, []);

  function getFriendsRequestList(listInfo) {
    const result = [];
    for (let i = 0; i < listInfo.length; i++) {
      if (currentUser.email === listInfo[i].photoSenderEmail) {
        console.log('cureent user email', currentUser.email, listInfo[i].photoSenderEmail);
        result.push(listInfo[i]);
      }
    }
    if (result.length !== 0) {
      setFriendsListRequest([...result]);
    }
  }
  const handleRequest = (requester, index) => {
    console.log(requester, index);
    Alert.alert(
      'Friend Request',
      `${requester.FriendsRequestUserName} feels connection with you and wants to add you as friends`,
      [
        { text: 'Ask me later', onPress: () => console.log('pressed ask me later') },
        {
          text: 'Pass',
          onPress: () => cancel(requester, index),
          style: 'cancel',
        },
        { text: 'Grant', onPress: () => addedToBeFriends(requester) },
      ],
      { cancelable: false }
    );
  };

  function cancel(requester) {
    const getRequestList = db.collection('beFriendsRequest').where('FriendsRequestUserEmail', '==', requester.FriendsRequestUserEmail);
    getRequestList.get().then((querySnapshot) => {
      console.log('what is queryList', querySnapshot);
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }

  function addedToBeFriends(requester) {
    cancel(requester);
    console.log('what should be friends', requester.friendsRequestUserEmail);
    const addFriends = {
      performerEmail: requester.photoSenderEmail,
      performerName: requester.photoSenderName,
      friendsRequestUserEmail: requester.FriendsRequestUserEmail,
      friendsRequestUserName: requester.FriendsRequestUserName
    };
    console.log('what is addfriends', addFriends);
    db.collection('friends')
      .doc()
      .set(addFriends);
  }
  return (
    <View>
      <Text>Here will show your friends requests</Text>
      {console.log('what is friendslist:', friendsListRequest)}
      {friendsListRequest.length === 0 ? (<Text> No Friends Requests</Text>)
        : friendsListRequest.map((data, i) => (
          <View>
            <TouchableOpacity onPress={() => handleRequest(data, i)}>
              {/* <TouchableOpacity onPress={handleRequest()}> */}
              <Text>{data.FriendsRequestUserName}</Text>
            </TouchableOpacity>
          </View>

        ))}

    </View>
  );
}
