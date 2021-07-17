import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';

import {
  Text,
  Container,
  Thumbnail,
  Form,
  Item,
  Input,
  Button,
  Content,
} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import {options} from '../utils/options';

import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {signUp} from '../actions/auth';
import propTypes from 'prop-types';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState(
    'https://chatsdk.co/wp-content/uploads/2016/09/firebase_logo_shot.png',
  );
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response =', response);

      if (response.didCancel) {
        console.log('User tapped on cancel');
      } else if (response.error) {
        console.log('Error in selecting Image');
      } else if (response.customButton) {
        console.log('User tapped in custom button');
      } else {
        console.log(response);

        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    console.log(response);
    setImageUploading(true);

    // getting the db reference
    const reference = storage().ref(response.fileName);

    const task = reference.putFile(response.path);

    task.on('state_changed', taskSnapshot => {
      console.log(taskSnapshot);

      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;

      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = reference.getDownloadURL();

      setImage(url);

      setImageUploading(false);
    });
  };

  const doSignUp = () => {
    signUp({name, email, password, instaUserName, bio, image});
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )}

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={{color: '#eee'}}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="email"
                value={email}
                style={{color: '#eee'}}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={{color: '#eee'}}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Instagram user name"
                value={instaUserName}
                style={{color: '#eee'}}
                onChangeText={text => setInstaUserName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Your Short Bio"
                value={bio}
                style={{color: '#eee'}}
                onChangeText={text => setBio(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={{color: '#eee'}}
                onChangeText={text => setCountry(text)}
              />
            </Item>
            <Button regular block onPress={doSignUp}>
              <Text>SignUp</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
});
