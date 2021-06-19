import React, {useState, useEffect} from 'react';

import {Alert, ScrollView, StyleSheet} from 'react-native';

import {Container, Form, Button, H1, Input, Item, Text} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [totalNoSeasons, setTotalNoSeasons] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    const {season} = route.params;
    const {id, name, totalNoSeasons} = season;

    setId(id);
    setName(name);
    setTotalNoSeasons(totalNoSeasons);
  }, []);

  const updateSeason = async id => {
    try {
      if (!name || !totalNoSeasons) {
        return Alert.alert('Please Fill both Fields');
      }

      const setSeason = {
        id,
        name,
        totalNoSeasons,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = JSON.parse(storedValue);

      list.map(oneSeason => {
        if (oneSeason.id == id) {
          oneSeason.name = name;
          oneSeason.totalNoSeasons = totalNoSeasons;
          oneSeason.isWatched = false;
        }
        return oneSeason;
      });

      await AsyncStorage.setItem('@season_list', JSON.stringify(list));

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

          <Button rounded block onPress={() => updateSeason(id)}>
            <Text style={{color: '#eee'}}>Update</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Edit;

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
