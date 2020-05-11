import React, { useState, useEffect, useReducer } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Firebase, { db } from '../../config/Firebase';
import Loading from './Loading';


export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [signInUser, setSignUser] = useState(navigation.state.params.name);
  const [loading, setLoading] = useState(true);
  


  //  console.log("friends data2", navigation.state.params.name," what is signInUser", signInUser)
  useEffect(() => {
  // const test=1

    const unsubscribe = Firebase.firestore()
      .collection('messages')
      .doc(chatID())
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => ({
          ...documentSnapshot.data()
        }));
        let object=[]
         for (let i=0; i<threads.length; i++){
               object.push({
                 _id:threads[i]._id,
                 createdAt:threads[i].createdAt.toDate(),
                 text:threads[i].text,
                 user:{
                   _id:threads[i].user._id,
                   avata:threads[i].user.avatar,
                   name:threads[i].user.name
                 }
               })

              console.log("createAt1", object.createdAt)
              
              }
              setMessages(object);
        // setMessages(threads);
        // console.log("what is newThreads", threads, object, threads[0].createdAt.toDate());
        // if (loading) {
        //   setLoading(false);
        // }
      });
    // renderUserList();
    return () => unsubscribe();
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }


  function chatID() {
    const chatterID = signInUser.currentSignUserUid;
    const chateeID = signInUser.friendsUid;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join('-');
  }
  function handleSend(newMessage, chatID) {

    // setMessages(GiftedChat.append(messages, newMessage));
    // console.log("newMessage",newMessage[0],chatID())


     return db.collection('messages')
      .doc(chatID())
      .collection('chats')
      .add(newMessage[0]);
  }

  const renderBubble = (props) => (
    // Step 3: return the component
    <Bubble
      {...props}
      wrapperStyle={{
        left: {

          backgroundColor: '#6646ee'
        }
      }}
      textStyle={{
        left: {
          color: '#fff'
        }
      }}
    />
  );
  // console.log("what is chatee",chatee)
  // console.log("what is message",messages)

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage, chatID)}

      user={{ _id: signInUser.currentSignUserUid, name: signInUser.currentSignUserName, avatar: 'https://facebook.github.io/react/img/logo_og.png' }}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
    />

  );
}
