import React, {useState, useEffect} from 'react';

import {StyleSheet, ScrollView} from 'react-native';

import {
  Fab,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Button,
  H1,
  Subtitle,
  Body,
  Header,
  CheckBox,
  Title,
  Text,
  Container,
  Spinner,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/core';

const Home = ({navigation, route}) => {
  const [listOfSeasons, setListOfSeasons] = useState(['title']);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getItem = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list');

    if (!storedValue) {
      setListOfSeasons([]);
    }

    const list = JSON.parse(storedValue);
    setListOfSeasons(list);

    setLoading(false);
  };

  const deleteSeason = async id => {
    const newList = listOfSeasons.filter(list => list.id !== id);

    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListOfSeasons(newList);
  };

  const markComplete = async id => {
    const newList = listOfSeasons.map(list => {
      if (list.id == id) {
        list.isWatched = !list.isWatched;
      }

      return list;
    });

    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListOfSeasons(newList);
  };

  useEffect(() => {
    getItem();
  }, [isFocused]);

  if (loading) {
    return (
      <Container>
        <Spinner color="#000" />
      </Container>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Container style={styles.container}>
        {listOfSeasons.length == 0 ? (
          <Header style={styles.heading}>
            <H1>No WatchList, add season to watchlist.</H1>
          </Header>
        ) : (
          <>
            <List>
              {listOfSeasons.map(season => (
                <ListItem key={season.id} style={styles.listItem} noBorder>
                  <Left>
                    <Button style={styles.actionButton}>
                      <Icon
                        name="trash"
                        danger
                        onPress={() => deleteSeason(season.id)}
                      />
                    </Button>

                    <Button style={styles.actionButton}>
                      <Icon
                        name="edit"
                        type="Feather"
                        onPress={() => navigation.navigate('Edit', {season})}
                      />
                    </Button>
                  </Left>

                  <Body>
                    <Title style={styles.seasonName}>{season.name}</Title>
                    <Text note> {season.totalNoSeasons} seasons to watch</Text>
                  </Body>

                  <Right>
                    <CheckBox
                      checked={season.isWatched}
                      onPress={() => markComplete(season.id)}
                    />
                  </Right>
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Fab
          position="bottomRight"
          style={{
            backgroundColor: '#5067ff',
          }}
          onPress={() => navigation.navigate('Add')}>
          <Icon name="add" />
        </Fab>
      </Container>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
