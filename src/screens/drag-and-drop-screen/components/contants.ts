import {SONG_HEIGHT, SONGS} from '..';

export type TSongPositions = {
  [key: number]: {
    updatedIndex: number;
    updatedTop: number;
  };
};

//create song positions object
export const getInitialPositions = (): TSongPositions => {
  let songPositions: TSongPositions = {};
  for (let i = 0; i < SONGS.length; i++) {
    songPositions[i] = {
      updatedIndex: i,
      updatedTop: i * SONG_HEIGHT,
    };
  }
  return songPositions;
};
