/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import {
  View, TouchableOpacity, Text, StyleSheet, Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Sharing from './Sharing';


export default function TakePhoto({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraInvo, setCameraInvo] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRoll, setCameraRoll] = useState(null);
  const [selectedImage, setSeletedImage] = useState(null);

  //Asking camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
      // eslint-disable-next-line no-use-before-define
      CameraRollPermission();
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function CameraRollPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      setCameraRoll(true);
    } else {
      setCameraRoll(false);

      Alert.alert('Need Permission to access the camera roll in order to save a photo');
    }
  }
  const cameraFolder = async () => {
    if (cameraRoll === true) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (result.cancelled === true) {
        return (
          <View />
        );
      }
      setSeletedImage({ localUri: result.uri });
    } else {
      Alert.alert('Need Permission to access the camera roll, please go to system to grant the permission ');
    }
  };

  if (selectedImage !== null) {
    const result = '123';
    return (
      <View>
        <Sharing item1={selectedImage} navigation={navigation} item2={result} />
      </View>
    );
  }

  const takingPhoto = async () => {
    if (cameraInvo) {
      const { uri } = await cameraInvo.takePictureAsync();
      CameraRollPermission();
      const asset = await MediaLibrary.createAssetAsync(uri);
      MediaLibrary.createAlbumAsync('Expo', [asset])
        .then(() => {
          Alert.alert('Picture Added!');
        })
        .catch((error) => {
          Alert.alert('An Error Occurred!', error);
        });
    }
  };
  const cameraFlip = () => {
    setCameraType(cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.Camera} type={cameraType} ref={(ref) => { setCameraInvo(ref); }}>
        <View style={styles.CameraScreen}>
          <TouchableOpacity style={styles.CameraIcons} onPress={cameraFolder}>
            <Ionicons name="md-folder-open" size={40} />
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
    backgroundColor: 'white',
    flex: 1,
  },
  CameraIcons: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'skyblue',
  },
  CameraScreen: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
  },
});
