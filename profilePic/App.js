import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Text>camera loading...</Text>
  </View>
);

const App = () => {
  const [image, setImage] = useState(null);

  const takePicture = async camera => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camtext}>You new Profile Picture</Text>
          <Image
            style={styles.clicked}
            source={{uri: image, width: '100%', height: '80'}}
          />
          <Button
            title="Click new Profile Pic"
            onPress={() => setImage(null)}
            color="orange"></Button>
        </View>
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to Access Camera',
            message: 'To use this App we need to use your Camera',
            buttonPositive: 'Accept',
            buttonNegative: 'Decline',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to Access Recorder',
            message: 'To use this App we need to use your Recorder',
            buttonPositive: 'Accept',
            buttonNegative: 'Decline',
          }}>
          {({camera, status}) => {
            if (status !== 'READY') {
              return <PendingView />;
            }
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={() => takePicture(camera)}>
                  <Text
                    style={{
                      textAlign: 'center',
                    }}>
                    SNAP
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a79df',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 50,
  },
  camtext: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 20,
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});

export default App;
