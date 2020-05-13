/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, Button
} from 'react-native';
import Firebase from '../../config/Firebase';
import Chat from './Chat';

export default function Friends({ navigation }) {
  const [myFriendsList, setMyFriendsList] = useState([]);
  const { currentUser } = Firebase.auth();

  console.log("currentuser1",currentUser)
  useEffect(() => {
    const getFriendsList = Firebase.firestore().collection('friends');
    getFriendsList.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => doc.data());
     console.log("what is getFriendsList", tempDoc)
      showFriendsList(tempDoc);
    });
  }, []);

  function showFriendsList(friendsData) {
    const result = [];
     
    for (let i = 0; i < friendsData.length; i++) {
      if (currentUser.email === friendsData[i].performerEmail) {
        console.log("current user",currentUser.email,friendsData[i].performerEmail)
        const friends = {
          friendsName: friendsData[i].friendsRequestUserName,
          friendsEmail: friendsData[i].friendsRequestUserEmail,
          friendsUid: friendsData[i].friendsRequestUserUid,
          friendsPic: friendsData[i].friendsRequestPic,
          currentSignUserEmail: friendsData[i].performerEmail,
          currentSignUserName: friendsData[i].performerName,
          currentSignUserUid: friendsData[i].performerUid,
          currentSignUserPic: friendsData[i].performerPic
        };
        result.push(friends);
      }else if(currentUser.email === friendsData[i].friendsRequestUserEmail){
         const friends={
          friendsName: friendsData[i].performerName,
          friendsEmail: friendsData[i].performerEmail,
          friendsUid: friendsData[i].performerUid,
          friendsPic: friendsData[i].performerPic,
          currentSignUserEmail: friendsData[i].friendsRequestUserEmail,
          currentSignUserName: friendsData[i].friendsRequestUserName,
          currentSignUserUid: friendsData[i].friendsRequestUserUid,
          currentSignUserPic:  friendsData[i].friendsRequestPic,
         
         }
         result.push(friends);
      }
    }
    console.log('what is resul1', result);
    setMyFriendsList(result);
  }

  const pressHandler = (data) => {
      console.log("what is firends data", data)

    navigation.navigate('Chat', {name:data});
  
  };



  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={pressHandler} />
      <Text>a list of friends </Text> */}
     
      {myFriendsList.length === 0 ? (<Text> No friends </Text>)
        : myFriendsList.map((data, i) => (
          <TouchableOpacity onPress={()=>pressHandler(data)} style={styles.grid}> 
       
           <Image style={styles.pic} source={{uri:data.friendsPic}} />
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Chat',{name:data.friendsName})}> */}
        
               
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
    marginBottom: 30,
    flexDirection: "row"
  },
  name: {
    color: "black",
    fontWeight: 'bold',
    paddingLeft: 20,
  
   
  
  },
  pic: {
    width: 50,
    height: 50
  }
});
