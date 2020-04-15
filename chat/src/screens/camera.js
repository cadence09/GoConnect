import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import {
  View, TouchableOpacity, Text, StyleSheet,Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function TakePhoto() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraInvo, setCameraInvo] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRoll, setCameraRoll]=useState(false)

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.CAMERA);
       setHasPermission(status === 'granted');
      
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  const cameraFolder= async()=>{
    console.log("camera roll granted")
    
      let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status === 'granted'){
         
         setCameraRoll(true)
      }else{
        
        setCameraRoll(false)
      }
      let result=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images
      });
     
    //  testing()
  }
  const takingPhoto=async()=>{
    if(cameraInvo){
      // let photo=await cameraInvo.takePictureAsync();
    //   console.log('tpaca');
    // const { uri } = await cameraInvo.takePictureAsync();
    // console.log('uri', uri);
    // createAlbum({uri})
    
 
    }
    
  }
  const cameraFlip=()=>{
    setCameraType(cameraType===Camera.Constants.Type.back? 
      Camera.Constants.Type.front:Camera.Constants.Type.back)
  }
//   async function createAlbum({uri}){
//     console.log("testing111",uri)
  
   
//      const asset = await MediaLibrary.createAssetAsync(uri);
    
//     console.log('asset', asset);
//     MediaLibrary.createAlbumAsync('Expo', asset)
//       .then(() => {
//         Alert.alert('Album created!')
//       })
//       .catch(error => {
//         Alert.alert('An Error Occurred!')
//       });
//  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.Camera} type={cameraType} ref={ref=>{setCameraInvo(ref)}}>
        <View style={styles.CameraScreen}>
          <TouchableOpacity style={styles.CameraIcons} onPress={cameraFolder} > 
            <Ionicons name="md-folder-open" size={40}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CameraIcons} onPress={takingPhoto}>
            <MaterialIcons name="linked-camera" size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.CameraIcons} onPress={cameraFlip}>
            <Ionicons name="ios-reverse-camera" size={40} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  Camera: {
    flex: 1,
    backgroundColor: 'white',
  },
  CameraScreen:{
    flex:2, 
    flexDirection:"row",
    justifyContent:"space-between",
    margin:30,
  },
  CameraIcons:{
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',  
             
  }
});
