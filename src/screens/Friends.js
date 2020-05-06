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
     
      showFriendsList(tempDoc);
    });
  }, []);

  function showFriendsList(friendsData) {
    const result = [];

    for (let i = 0; i < friendsData.length; i++) {
      if (currentUser.email === friendsData[i].performerEmail) {
        const friends = {
          friendsName: friendsData[i].friendsRequestUserName,
          friendsEmail: friendsData[i].friendsRequestUserEmail
        };
        result.push(friends);
      }else if(currentUser.email === friendsData[i].friendsRequestUserEmail){
         const friends={
          friendsName: friendsData[i].performerName,
          friendsEmail: friendsData[i].performerEmail
         }
         result.push(friends);
      }
    }
    console.log('what is resul1', result);
    setMyFriendsList(result);
  }

  const pressHandler = (data) => {
    
    // navigation.navigate('Chat', {name:data.friendsName});
    navigation.navigate('Chat', {name:[data.friendsName,data.friendsEmail]});
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
          <View>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Chat',{name:data.friendsName})}> */}
            <TouchableOpacity onPress={()=>pressHandler(data)}>
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
