import React, {useState} from 'react';

import {Text, StyleSheet, ScrollView, Alert} from 'react-native';

import {Container, Form, Button, H1, Input, Item} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import shortid from 'shortid';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalNoSeasons, setTotalNoSeasons] = useState();

  const addToList = async () => {
    try {
      if (!name || !totalNoSeasons) {
        return Alert.alert('Please Enter Both Fields');
      }

      const seasonList = {
        id: shortid.generate(),
        name: name,
        totalNoSeasons: totalNoSeasons,
        isMarked: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValue);

      if (!prevList) {
        const newList = [seasonList];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonList);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Form>
          <H1 style={styles.heading}>Add Your Seasons</H1>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Enter Season Name"
              style={{
                color: '#eee',
              }}
              value={name}
              onChangeText={name => setName(name)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Enter No of Seasons"
              style={{
                color: '#eee',
              }}
              value={totalNoSeasons}
              onChangeText={totalNoSeasons => setTotalNoSeasons(totalNoSeasons)}
            />
          </Item>

          <Button rounded block onPress={addToList}>
            <Text style={{color: '#eee'}}>Add</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});
