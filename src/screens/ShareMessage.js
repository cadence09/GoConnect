import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import Firebase, { db } from '../../config/Firebase';

export default function ShareMessage({ navigation }) {
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
  useEffect(() =>{
      const getPhotoMessage = Firebase.firestore().collection('photoMessage')
      getPhotoMessage.get().then((querySnapshot)=>{
        const tempDoc= querySnapshot.docs.map((doc)=>{
           return doc.data();
        })
        // console.log("what is photomessage", tempDoc)
        showPhotoMessage(tempDoc)
      })
  }, []
  )

   
  function showPhotoMessage(notifications){
  //  console.log("what is notificatin" ,notifications)
  let result=[];
  let currentRan=0;
  const currentUser = Firebase.auth().currentUser;
  const userData = Firebase.firestore().collection('users')
  userData.get().then((userQuerySnapshot) => {
      const userDoc = userQuerySnapshot.docs.map((doc)=> {
        return doc.data();
      })
       for (let j=0; j<userDoc.length; j++){
         if(currentUser.email === userDoc[j].email){
             currentRan=userDoc[j].randomNum
         }
       }
       console.log("what is currentRan", currentRan)
       console.log("what is userDoc", userDoc , "what is notification", notifications)
      //  console.log("what is notification receier", notifications[1].receiver,"randomNum",userDoc[0].randomNum )
      //  console.log("true",notifications[1].receiver===userDoc[0].randomNum  )
      for (let i = 0; i<notifications.length; i++){
        // for(let j=0; j<userDoc.length; j++){
        if(notifications[i].receiver === currentRan){
                console.log("true",notifications[i].receiver,currentRan  )
          //  console.log("hello kate")
          
          result.push(notifications[i])
        //  }
         }
      }
      // const img = result.uri;
      // console.log("what image",img)
      // let result1= fetch(img)
      // console.log("what is result1",result1)
      
      console.log("what is result", result)
      if (result.length !== 0){
       return setReceivingMessage(...result)
      // return setReceivingMessage(result,...result )
      }
      else{
        return setReceivingMessage('No Message')
      }
  })
  }
   
  let message1=(<View> 
    <Text> Message from {receivingMessage.senderName}</Text>
    <Image source={{uri:receivingMessage.uri}} style={styles.thumbNail}/>
    <Text> {receivingMessage.text} </Text>
  </View>)
   let message2= (<Text>no message received </Text>)

 console.log("waht is receivingMessage", receivingMessage)
  return (
    <View>
      { console.log("wat is length", receivingMessage.length, typeof receivingMessage)}
      {receivingMessage.length === 10 ? message2: message1}
       {/* {typeof receivingMessage === "object" ? message1: message2}  */}
         {/* {receivingMessage === "No Message" ? console.log(true): message1}  */}
    
    </View>
  )
}


const styles = StyleSheet.create({
  thumbNail: {
    top: -40,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  message:{
    top: -60
  }

});
