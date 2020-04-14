import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import {
  View, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TakePhoto() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.Camera} type={cameraType}>
        <View>
          <TouchableOpacity>
            <Ionicons name="md-folder-open" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="linked-camera" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-reverse-camera" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  Camera: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});
