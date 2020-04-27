 {/* <Text>{receivingMessage[1].randomNumber}</Text> */}

     {/* <Text> Message from {receivingMessage.senderName}</Text>
      <Image source={{uri:receivingMessage.uri}} style={styles.thumbNail}/>
      <Text style={styles.message}>{receivingMessage.text}</Text> */}
      {/* {receivingMessage.length !== 0 ? console.log(true): console.log(false)} */}

     //first try
       {receivingMessage.length !== 0 ? (
        <>
       <Text> Message from {receivingMessage.senderName}</Text> 
         <Image source={{uri:receivingMessage.uri}} style={styles.thumbNail}/>
       </>)
       : 
      // (<Text>no message Receive</Text>)
    console.log(false)
    }  

     // second try
        {
         receivingMessage.map(data => 
          data.length !==0 ? (<Text> Message from {receivingMessage.senderName}</Text>
             ) : console.log(false))
     
      } 

      //third try 
       {/* {
         receivingMessage.length !==0? (
         <> 
         {receivingMessage.map(data =>(
              console.log(data)
         ))}
        </>)
        : console.log(false)
      } */}