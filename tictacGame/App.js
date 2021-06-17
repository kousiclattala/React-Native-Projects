import React, {useState} from 'react';

import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {
  Text,
  Container,
  Card,
  H1,
  H3,
  Content,
  Header,
  Body,
  Button,
  Title,
} from 'native-base';

import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

// import CheckWinner from './components/CheckWinner';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  // checks who is the winner
  const checkIsWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`${itemArray[0]} Won`);
    } else if (
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== 'empty'
    ) {
      setWinMessage(`${itemArray[3]} Won`);
    } else if (
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8] &&
      itemArray[6] !== 'empty'
    ) {
      setWinMessage(`${itemArray[6]} Won`);
    } else if (
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`${itemArray[0]} Won`);
    } else if (
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== 'empty'
    ) {
      setWinMessage(`${itemArray[1]} Won`);
    } else if (
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== 'empty'
    ) {
      setWinMessage(`${itemArray[2]} Won`);
    } else if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`${itemArray[0]} Won`);
    } else if (
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== 'empty'
    ) {
      setWinMessage(`${itemArray[2]} Won`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[1] !== 'empty' &&
      itemArray[2] !== 'empty' &&
      itemArray[3] !== 'empty' &&
      itemArray[4] !== 'empty' &&
      itemArray[5] !== 'empty' &&
      itemArray[6] !== 'empty' &&
      itemArray[7] !== 'empty' &&
      itemArray[8] !== 'empty'
    ) {
      setWinMessage('Game Drawn');
    }
    // const message = <CheckWinner itemArray={itemArray} />;
    // console.log(message);
    // setWinMessage(message);
  };
  // reload the game
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    itemArray.fill('empty', 0, 9);
  };

  // checks whose turn it is
  const changeItem = itemNumber => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: '#fff',
      });
    }

    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';

      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position Already Filled',
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }

    checkIsWinner();
  };

  return (
    <Container style={{backgroundColor: '333945', padding: 5}}>
      <Header>
        <Body>
          <Title>Tic Tac Toe Game</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>
          {itemArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => changeItem(index)}>
              <Card style={styles.card}>
                <Icons name={item} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {winMessage ? (
          <View>
            <H1 style={styles.message}>{winMessage}</H1>
            <Button rounded block onPress={reloadGame} danger>
              <Text>Reload Game</Text>
            </Button>
          </View>
        ) : (
          <View>
            <H1 style={styles.message}>{isCross ? 'cross' : 'circle'} turn</H1>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  box: {
    width: '33%',
    marginBottom: 6,
  },
  card: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    marginTop: 20,
    backgroundColor: '#4652b3',
    paddingVertical: 15,
    marginVertical: 10,
  },
});
