import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

export const signUp = data => async dispatch => {
  console.log(data);

  const {email, password, name, instaUserName, bio, country, image} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          instaUserName,
          bio,
          country,
          image,
          uid: data.user.uid,
        })
        .then(() => {
          Snackbar.show({
            text: 'User added to DB',
            textColor: 'white',
            backgroundColor: 'lightblue',
          });
        });

      Snackbar.show({
        text: 'signup success',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'signup failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log(data);

  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);
      Snackbar.show({
        text: 'Signin success',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'SignIn Error',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      Snackbar.show({
        text: 'Signed out success',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'Error in signout',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
