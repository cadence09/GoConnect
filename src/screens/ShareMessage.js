import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, Button, Alert
} from 'react-native';
import Firebase, { db } from '../../config/Firebase';


export default function ShareMessage() {
  const [receivingMessage, setReceivingMessage] = useState([]);
  const [user, setUser] = useState('');
  const { currentUser } = Firebase.auth();

  // Load the photo moments in Firebase
  useEffect(() => {
    const getPhotoMessage = Firebase.firestore().collection('photoMessage');
    getPhotoMessage.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
      showPhotoMessage(tempDoc);
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

  const addFriendButton = (index, photoInfo) => {
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
    const friendsRequestList = Firebase.firestore().collection('beFriendsRequest');
    friendsRequestList.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
      if (tempDoc.length === 0) {
        db.collection('beFriendsRequest')
          .doc()
          .set(friendsRequestInfo);
        Alert.alert('Friend request sent!');
      } else {
        for (let i = 0; i < tempDoc.length; i++) {
          if (tempDoc[i].FriendsRequestUserEmail === friendsRequestInfo.FriendsRequestUserEmail) {
            return Alert.alert('Friend request sent!');
          }
          db.collection('beFriendsRequest')
            .doc()
            .set(friendsRequestInfo);
          Alert.alert('Friend request sent!');
        }
      }
    });
  };

  // const deletePhotoMessage = (index, data) => {
  //   console.log('delte data', index, data);
  // };

  return (
    <View>

      {/* First method with if/esle */}
      {/* {Message} */}

      {/* Second method with tanery operator */}
      {receivingMessage.length === 0 ? (<Text> No Message</Text>)
        : receivingMessage.map((data, i) => (
          <View>
            <ScrollView>

              <View key={i + 1}>
                <Text>{i + 1}</Text>
                <Image source={{ uri: data.uri }} style={styles.thumbNail} />
                <Text>
                  Message from
                  {' '}
                  {data.senderName}
                </Text>
                <Text style={styles.message}>
                  {data.text}
                </Text>
                <Button title="Add Friend" onPress={() => addFriendButton(i + 1, data)} />
                {/* <Button title="Skip" onPress={() => deletePhotoMessage(i + 1, data)} /> */}
              </View>
            </ScrollView>
          </View>

        ))}

    </View>
  );
}


const styles = StyleSheet.create({
  message: {
    top: 0
  },
  thumbNail: {
    height: 100,
    resizeMode: 'contain',
    top: 0,
    width: 300,
  },


});
