import React from 'react';

const CheckWinner = ({itemArray}) => {
  if (
    itemArray[0] === itemArray[1] &&
    itemArray[0] === itemArray[2] &&
    itemArray[0] !== 'empty'
  ) {
    return itemArray[0];
  } else if (
    itemArray[3] === itemArray[4] &&
    itemArray[3] === itemArray[5] &&
    itemArray[3] !== 'empty'
  ) {
    return itemArray[3];
  } else if (
    itemArray[6] === itemArray[7] &&
    itemArray[6] === itemArray[8] &&
    itemArray[6] !== 'empty'
  ) {
    return itemArray[6];
  } else if (
    itemArray[0] === itemArray[3] &&
    itemArray[0] === itemArray[6] &&
    itemArray[0] !== 'empty'
  ) {
    return itemArray[0];
  } else if (
    itemArray[1] === itemArray[4] &&
    itemArray[1] === itemArray[7] &&
    itemArray[1] !== 'empty'
  ) {
    return itemArray[1];
  } else if (
    itemArray[2] === itemArray[5] &&
    itemArray[2] === itemArray[8] &&
    itemArray[2] !== 'empty'
  ) {
    return itemArray[2];
  } else if (
    itemArray[0] === itemArray[4] &&
    itemArray[0] === itemArray[8] &&
    itemArray[0] !== 'empty'
  ) {
    return itemArray[0];
  } else if (
    itemArray[2] === itemArray[4] &&
    itemArray[2] === itemArray[6] &&
    itemArray[2] !== 'empty'
  ) {
    return itemArray[2];
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
    return 'Game Drawn';
  }
};

export default CheckWinner;
