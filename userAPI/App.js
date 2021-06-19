import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Axios from 'axios';
import {Button} from 'native-base';
import User from './components/User';

const App = () => {
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const {data} = await Axios.get('https://randomuser.me/api/');
      const details = data.results[0];

      setDetails(details);
      // console.log(details);
    } catch (error) {
      console.error('Error in Fetching the user');
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading.....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <User details={details} />
        <Button rounded style={styles.button} onPress={() => fetchDetails()}>
          <Text>New User</Text>
        </Button>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222831',
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
});
