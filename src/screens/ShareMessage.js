import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, Button, Alert,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Firebase, { db } from '../../config/Firebase';

export default function ShareMessage() {
  const [receivingMessage, setReceivingMessage] = useState([]);
  const [user, setUser] = useState('');
  const [duplicate, setduplicate] = useState([]);
  const { currentUser } = Firebase.auth();


  // Load the photo moments in Firebase
  useEffect(() => {
    const getPhotoMessage = Firebase.firestore().collection('photoMessage');
    getPhotoMessage.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
      showPhotoMessage(tempDoc);
      getFriendsList();
    });
  }, []);

  function showPhotoMessage(tempDocData) {
    const result = [];
    let currentRan = 0;

    // retrive users name and profile picture
    const userData = Firebase.firestore().collection('users');
    userData.get().then((userQuerySnapshot) => {
      const userDoc = userQuerySnapshot.docs.map((doc) => doc.data());
      for (let j = 0; j < userDoc.length; j++) {
        if (currentUser.email === userDoc[j].email) {
          currentRan = userDoc[j].randomNum;
          const userInfo = {
            userName: userDoc[j].userName,
            userPic: userDoc[j].profilePicture.localUri
          };
          setUser(userInfo);
        }
      }
      for (let i = 0; i < tempDocData.length; i++) {
        if (tempDocData[i].receiver === currentRan) {
          result.push(tempDocData[i]);
        }
      }

      if (result.length !== 0) {
        return setReceivingMessage([...result]);
      }
    });
  }

  if (receivingMessage.length !== 0) {
    for (let i = 0; i < receivingMessage.length; i++) {
      if (Math.abs(receivingMessage[i].createdAt - Date.now() > 1)) {
        const momentList = db.collection('photoMessage').where(receivingMessage[i].createdAt === 'createdAt');
        momentList.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      }
    }
  }

  const addFriendButton = (index, photoInfo,) => {
    let a = [];
    const friendsRequestInfo = {
      photoSenderEmail: photoInfo.sender,
      photoSenderName: photoInfo.senderName,
      photoSenderUid: photoInfo.uid,
      photoSenderPic: photoInfo.senderProfilePic,
      FriendsRequestUserName: user.userName,
      FriendsRequestUserEmail: currentUser.email,
      FriendsRequestUserUid: currentUser.uid,
      FriendsRequestPic: user.userPic
    };
    a.push(friendsRequestInfo.photoSenderUid, friendsRequestInfo.FriendsRequestUserUid);
    a = a.sort().join('-');

    const duplicateResult = duplicate.filter((data) => data === a);

    const friendsRequestList = Firebase.firestore().collection('beFriendsRequest');
    friendsRequestList.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());

      if (duplicateResult.length === 1) {
        Alert.alert('Your already friends');
      } else if (tempDoc.length === 0 && duplicateResult.length === 0) {
        db.collection('beFriendsRequest')
          .doc()
          .set(friendsRequestInfo);
        Alert.alert('Friend request sent!');
      } else {
        Alert.alert('Friend request sent!');
      }
    });
  };

  function getFriendsList() {
    const friendsList = Firebase.firestore().collection('friends');
    friendsList.get().then((querySnapshot) => {
      const friendsListDoc = querySnapshot.docs.map((doc) => doc.data());
      console.log('friend', typeof friendsListDoc);
      for (let i = 0; i < friendsListDoc.length; i++) {
        let newId = [friendsListDoc[i].performerUid, friendsListDoc[i].friendsRequestUserUid];
        newId = newId.sort().join('-');
        console.log('what is ths', newId);
        setduplicate([newId]);
      }
    });
  }


  return (

    <ViewPager style={styles.container} initialPage={0}>

      {/* First method with if/esle */}
      {/* {Message} */}

      {/* Second method with tanery operator */}
      {receivingMessage.length === 0 ? (<Text> No Message</Text>)
        : receivingMessage.map((data, i) => (
          <View>
            <Text>{i + 1}</Text>
            <Image source={{ uri: data.senderProfilePic }} style={styles.profilePic} />
            <Text style={styles.sender}>
              {data.senderName}
              {' '}
              share a photo moment to you.
            </Text>
            <Image source={{ uri: data.uri }} style={styles.thumbNail} />
            <Text style={styles.message}>
              {data.senderName}
              {' '}
              {data.text}
            </Text>
            <Button title="Add Friend" onPress={() => addFriendButton(i + 1, data)} />
          </View>
        ))}
    </ViewPager>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    top: 0,
  },
  profilePic: {
    borderRadius: 50,
    height: 50,
    marginLeft: 10,
    top: 35,
    width: 50
  },
  sender: {
    textAlign: 'center',

    top: 10,

  },
  thumbNail: {
    height: 300,
    margin: 30,
    resizeMode: 'contain'

  },


});
