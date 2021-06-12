import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import DiceOne from './assets/dice1.png';
import DiceTwo from './assets/dice2.png';
import DiceThree from './assets/dice3.png';
import DiceFour from './assets/dice4.png';
import DiceFive from './assets/dice5.png';
import DiceSix from './assets/dice6.png';

const App = () => {
  const [img1, setImg1] = useState(DiceOne);
  const [img2, setImg2] = useState(DiceTwo);

  let randomNum = Math.floor(Math.random() * 6) + 1;
  let randomNum2 = Math.floor(Math.random() * 6) + 1;

  const randomDice = () => {
    switch (randomNum) {
      case 1:
        setImg1(DiceOne);
        break;
      case 2:
        setImg1(DiceTwo);
        break;
      case 3:
        setImg1(DiceThree);
        break;
      case 4:
        setImg1(DiceFour);
        break;
      case 5:
        setImg1(DiceFive);
        break;
      case 6:
        setImg1(DiceSix);
        break;
      default:
        setImg1(DiceOne);
        break;
    }
    switch (randomNum2) {
      case 1:
        setImg2(DiceOne);
        break;
      case 2:
        setImg2(DiceTwo);
        break;
      case 3:
        setImg2(DiceThree);
        break;
      case 4:
        setImg2(DiceFour);
        break;
      case 5:
        setImg2(DiceFive);
        break;
      case 6:
        setImg2(DiceSix);
        break;
      default:
        setImg2(DiceOne);
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={randomDice}>
          <Image source={img1} style={styles.image} />
          <Image source={img2} style={styles.image} />

          {/* <Text style={styles.gamPlayButton}>Play Game</Text> */}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  gamPlayButton: {
    fontSize: 20,
    marginTop: 30,
    color: '#f2a365',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderColor: '#30475e',
    borderRadius: 5,
    borderWidth: 3,
    fontWeight: 'bold',
  },
});
