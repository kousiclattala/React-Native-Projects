import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Text,
  Right,
  Switch,
  CheckBox,
  Title,
  Subtitle,
  H1,
  Fab,
  Container,
  Content,
} from 'native-base';

import {removeSeason, markComplete} from '../action/list';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// TODO: action to perform in redux

const Home = ({navigation, removeSeason, markComplete, listState}) => {
  // if the length of the season is zero then rendering container with the message
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {listState.length == 0 ? (
        <Container style={styles.emptyContainer}>
          <H1 style={styles.heading}>
            Watch list is empty, start by adding one
          </H1>
        </Container>
      ) : (
        <Content padder>
          <H1 style={styles.heading}>Next Series to Watch</H1>
          <List>
            {listState.map(season => (
              <ListItem icon key={season.id} style={styles.listItem} noBorder>
                <Left>
                  <Button
                    style={styles.actionButton}
                    onPress={() => {
                      console.log(season.id);
                      removeSeason(season.id);
                    }}
                    danger>
                    <Icon active name="trash" />
                  </Button>
                </Left>
                <Body>
                  <Title style={styles.seasonName}>{season.name}</Title>
                  <Text note> {season.totalNoSeason} season to watch </Text>
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
        </Content>
      )}

      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => navigation.navigate('Add')}>
        <Icon name="add" />
      </Fab>
    </ScrollView>
  );
};

//TODO: redux config

const mapStateToProps = state => ({
  // we need to tell react-native that this is coming from state,
  // which we mentioned in our reducer function.
  listState: state.listReducer,
});

const mapDispatchToProps = {
  removeSeason: id => removeSeason(id),
  markComplete: id => markComplete(id),
};

Home.propTypes = {
  removeSeason: propTypes.func.isRequired,
  markComplete: propTypes.func.isRequired,
  listState: propTypes.array.isRequired,
};

//TODO: Redux export
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// empty container style will be work in the loading as well as the empty message screen
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
