import React, { useState,useEffect,useReducer } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Firebase, {db} from '../../config/Firebase';
import Loading from './Loading';
export default function Chat({navigation}){
    const [messages, setMessages] = useState([
        // {
        //     _id: 0,
        //     text: 'New room created.',
        //     createdAt: new Date().getTime(),
        //     system: true
        //   },
        //   // example of chat message
        //   {
        //     _id: 1,
        //     text: 'Henlo!',
        //     createdAt: new Date().getTime(),
        //     user: {
        //       _id: 2,
        //       name: 'Test User'
        //     }
        //   }
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any'
            }
          } 
    ])
    const [signInUser, setSignUser]=useState('');
    const [chatee, setChatee]=useState('');
     const currentUser=Firebase.auth().currentUser;
    const [loading, setLoading] = useState(true);
   
    
    //  console.log("friends data2", navigation.state.params)
useEffect(()=>{
  // const test=1
  const unsubscribe = Firebase.firestore()
  .collection("messages")
  .doc(chatID())
  .collection('chats')
  .orderBy('createdAt', 'desc')

  .onSnapshot(querySnapshot => {
    const threads = querySnapshot.docs.map(documentSnapshot => {
      return {
        ...documentSnapshot.data()
      };
    });
  
    setMessages(threads);
    console.log("what is thread", threads)
    if (loading) {
      setLoading(false);
    }
  });
        renderUserList()
       return () => unsubscribe()
},[])

if (loading) {
 
  return <Loading/>;
}


// function getfirebase(data){
//    setMessages(data)
//    return  setMessages(GiftedChat.append(messages, data))
//    setTimeout(setMessages);
// }
function renderUserList(){

  const getUserList=Firebase.firestore().collection('users')
  getUserList.get().then((querySnapshot)=>{
   const tempDoc=querySnapshot.docs.map((doc)=> 
       doc.data())
       getUserInfo(tempDoc)
  })
}
function getUserInfo(data){

  let result='';
  for (let i=0; i<data.length; i++){
    if(data[i].email===currentUser.email){
    
    let userInfo={
         email:data[i].email,
         uid:data[i].uid,
         userName:data[i].userName
    }
    result=userInfo
    }
  }
  setSignUser(result)
  getChateeInfo(data)
}

function getChateeInfo(data){
  // console.log("what is data in chatee", data)
  // console.log("navigation params", navigation.state.params.name[0])
  let result='';
 
  for (let i=0; i<data.length; i++){
      if(navigation.state.params.name[1]===data[i].email){
          result={
            name:navigation.state.params.name[0],
            email:navigation.state.params.name[1],
            uid:data[i].uid
          }
      }
  }
 
  setChatee(result)
}
function chatID(){
  const chatterID = signInUser.uid;
  const chateeID = chatee.uid;
  const chatIDpre = [];
  chatIDpre.push(chatterID);
  chatIDpre.push(chateeID);
  chatIDpre.sort();
  return chatIDpre.join('-');
};
    function handleSend(newMessage,chatID) {
        
        // setMessages(GiftedChat.append(messages, newMessage));
        // console.log("newMessage",newMessage[0],chatID())
     
       
        
      //  return db.collection('messages')
      //   .doc(chatID())
      //   .collection('chats')
      //   .add(newMessage[0]);
      }

const renderBubble=(props)=>{
  return (
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
}
// console.log("what is chatee",chatee)
// console.log("what is message",messages)

      return (
        <GiftedChat
          messages={messages}
          onSend={newMessage => handleSend(newMessage,chatID)}
          
          user={{ _id: signInUser.uid,name:signInUser.userName,avatar:'https://facebook.github.io/react/img/logo_og.png'}}
          renderBubble={renderBubble}
          alwaysShowSend
          scrollToBottom
         
        />
        
      );
}