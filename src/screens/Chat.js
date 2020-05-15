import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Firebase, { db } from '../../config/Firebase';

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [signInUser, setSignUser] = useState(navigation.state.params.name);


  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection('messages')
      .doc(chatID())
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => ({
          ...documentSnapshot.data()
        }));
        const object = [];
        for (let i = 0; i < threads.length; i++) {
          object.push({
            _id: threads[i]._id,
            createdAt: threads[i].createdAt.toDate(),
            text: threads[i].text,
            user: {
              _id: threads[i].user._id,
              avata: threads[i].user.avatar,
              name: threads[i].user.name
            }
          });
        }
        setMessages(object);
      });
    return () => unsubscribe();
  }, []);


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
    return db.collection('messages')
      .doc(chatID())
      .collection('chats')
      .add(newMessage[0]);
  }

  const renderBubble = (props) => (

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
