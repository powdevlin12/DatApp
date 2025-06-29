import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListItem} from './components/list-item';
import {useSharedValue} from 'react-native-reanimated';
import {getInitialPositions, TSongPositions} from './components/contants';

export const Color_Pallete = {
  metal_black: '#0E0C0A',
  night_shadow: '#1C1C1C',
  crystal_white: '#FFFFFF',
  silver_storm: '#808080',
};

export const SONG_HEIGHT = 80;

export type TItem = {
  id: number;
  title: string;
  singer: string;
  imageSrc: string;
};

export const SONGS: TItem[] = [
  {
    id: 0,
    title: 'Hymn for the Weekend',
    singer: 'Coldplay',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6',
  },
  {
    id: 1,
    title: 'Paradise',
    singer: 'Coldplay',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273de0cd11d7b31c3bd1fd5983d',
  },
  {
    id: 2,
    title: 'Viva La Vida',
    singer: 'Coldplay',
    imageSrc: 'https://i.ytimg.com/vi/dvgZkm1xWPE/maxresdefault.jpg',
  },
  {
    id: 3,
    title: 'A Sky Full of Stars',
    singer: 'Coldplay',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273e5a95573f1b91234630fd2cf',
  },
  {
    id: 4,
    title: 'Clocks',
    singer: 'Coldplay',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273de09e02aa7febf30b7c02d82',
  },
  {
    id: 5,
    title: 'The Scientist',
    singer: 'Coldplay',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273de09e02aa7febf30b7c02d82',
  },
  {
    id: 6,
    title: 'Dusk Till Dawn (feat. Sia)',
    singer: 'ZAYN, Sia',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b27323852b7ef0ecfe29d38d97ee',
  },
  {
    id: 7,
    title: 'Titanium (feat. Sia)',
    singer: 'David Guetta, Sia',
    imageSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnwB_jMjMFnQkQOPvENr-diiJfDWFripRHBMSdeaHZyA&s',
  },
  {
    id: 8,
    title: 'Chandelier',
    singer: 'Sia',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273297b2c53224bd19162f526e3',
  },
  {
    id: 9,
    title: 'Unstoppable',
    singer: 'Sia',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273754b2fddebe7039fdb912837',
  },
  {
    id: 10,
    title: 'Cheap Thrills',
    singer: 'Sia, Sean Paul',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b2731e6901561bb0cd5697cbfded',
  },
  {
    id: 11,
    title: 'Elastic Heart',
    singer: 'Sia',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b2735d199c9f6e6562aafa5aa357',
  },
  {
    id: 12,
    title: 'Believer',
    singer: 'Imagine Dragons',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273156aeddf54ed40b1d9d30c9f',
  },
  {
    id: 13,
    title: 'Let me love you',
    singer: 'DJ Snake, Justin Bieber',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273212d776c31027c511f0ee3bc',
  },
  {
    id: 14,
    title: 'Lean On',
    singer: 'Major Lazer',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273548910835dbfaf3f79a1dc46',
  },
  {
    id: 15,
    title: 'Taki Taki',
    singer: 'DJ Snake',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273e105c410a7b390c61a58cbf8',
  },
];

const DragAndDropScreen = () => {
  const currentSongPositions = useSharedValue<TSongPositions>(
    getInitialPositions(),
  );

  //used to know if drag is happening or not
  const isDragging = useSharedValue<0 | 1>(0);

  //this will hold id for item which user started dragging
  const draggedItemId = useSharedValue<number | null>(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.listContainer}>
        <ScrollView
          contentContainerStyle={{
            height: (SONGS.length + 1) * SONG_HEIGHT,
          }}>
          {SONGS.map(eachSong => (
            <ListItem
              item={eachSong}
              key={eachSong.id}
              currentSongPositions={currentSongPositions}
              isDragging={isDragging}
              draggedItemId={draggedItemId}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DragAndDropScreen;

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Color_Pallete.metal_black,
    height: '100%',
    flex: 1,
  },
});
