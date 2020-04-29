import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import Firebase, { db } from '../../config/Firebase';

export default function ShareMessage() {
  // const [receivingMessage, setReceivingMessage]= useState([])
  const [receivingMessage, setReceivingMessage]= useState([])
  // const pressHandler = () => {
  //   navigation.goBack();
  // };
    // const events = Firebase.firestore().collection('users')
    // events.get().then((querySnapshot) => {
    //     const tempDoc = querySnapshot.docs.map((doc) => {
    //       return doc.data().email
    //     })
  useEffect(() => {
    const getPhotoMessage = Firebase.firestore().collection('photoMessage')
    getPhotoMessage.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
        // console.log("what is photomessage", tempDoc)
      showPhotoMessage(tempDoc);
    });
  }, []);

  function showPhotoMessage(notifications) {
  //  console.log("what is notificatin" ,notifications)
    let result = [];
    let currentRan = 0;
    const currentUser = Firebase.auth().currentUser;
    const userData = Firebase.firestore().collection('users');
    userData.get().then((userQuerySnapshot) => {
      const userDoc = userQuerySnapshot.docs.map((doc) => {
        return doc.data();
      });
      for (let j = 0; j < userDoc.length; j++) {
        if (currentUser.email === userDoc[j].email) {
          currentRan = userDoc[j].randomNum;
        }
      }
      for (let i = 0; i < notifications.length; i++) {
        // for(let j=0; j<userDoc.length; j++){
        if (notifications[i].receiver === currentRan) {
          result.push(notifications[i]);
        //  }
        }
      }

      // console.log("what is result", result)
      if (result.length !== 0) {
        return setReceivingMessage([...result]);
      }
    });
  }
  // let Message;
  // if (receivingMessage.length === 0) {
  //   Message = (<Text> No Message</Text>);
  // } else {
  //   Message = receivingMessage.map(data => (
  //     <View>
  //       <Text> Message from {data.senderName}</Text>
  //       <Image source={{ uri:data.uri }} style={styles.thumbNail} />
  //       <Text> { data.text } </Text>
  //     </View>
  //   ))
  // }
  return (
    <View>

      {/* First method with if/esle */}
          {/* {Message} */}

      {/* Second method with tanery operator */}
      {receivingMessage.length === 0 ? (<Text> No Message</Text>): 
        receivingMessage.map(data => (
          <View>
            <Text> Message from {data.senderName}</Text>
            <Image source={{uri:data.uri}} style={styles.thumbNail}/>
            <Text style={styles.message}> {data.text}  </Text>
          </View>
        ))}
    </View>
  );
}


const styles = StyleSheet.create({
  message: {
    top: -30
  },
  thumbNail: {
    height: 300,
    resizeMode: 'contain',
    top: -40,
    width: 300,
  }

});
