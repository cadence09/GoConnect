/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
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
          currentSignUserEmail: friendsData[i].performerEmail,
          currentSignUserName: friendsData[i].performerName,
          currentSignUserUid: friendsData[i].performerUid
        };
        result.push(friends);
      }else if(currentUser.email === friendsData[i].friendsRequestUserEmail){
         const friends={
          friendsName: friendsData[i].performerName,
          friendsEmail: friendsData[i].performerEmail,
          friendsUid: friendsData[i].performerUid,
          currentSignUserEmail: friendsData[i].friendsRequestUserEmail,
          currentSignUserName: friendsData[i].friendsRequestUserName,
          currentSignUserUid: friendsData[i].friendsRequestUserUid
         }
         result.push(friends);
      }
    }
    console.log('what is resul1', result);
    setMyFriendsList(result);
  }

  const pressHandler = (data) => {
      console.log("what is firends data", data)
    // navigation.navigate('Chat', {name:data.friendsName});
    navigation.navigate('Chat', {name:data});
    // return (<View><Chat data1={data}/></View>)
    // transfer(data)
  };

  // function transfer(data){
  //   console.log("whati si dataa",data)
  //   return (<View><Chat data={data}/></View>)
  // }
// if(pressHandler){
//  
// }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={pressHandler} />
      <Text>a list of friends </Text> */}
      {myFriendsList.length === 0 ? (<Text> No friends </Text>)
        : myFriendsList.map((data, i) => (
          <View style={styles.grid}>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Chat',{name:data.friendsName})}> */}
            <TouchableOpacity onPress={()=>pressHandler(data)}>
              <Text style={styles.name}>{data.friendsName}</Text>
             
            </TouchableOpacity>
          </View>
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
    marginBottom: 30
  },
  name: {
    color: "black",
    fontWeight: 'bold',
  
  }
});
