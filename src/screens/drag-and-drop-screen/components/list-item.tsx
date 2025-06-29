import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {Color_Pallete, SONG_HEIGHT, TItem} from '..';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {TSongPositions} from './contants';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export type TListItem = {
  item: TItem;
  currentSongPositions: SharedValue<TSongPositions>;
  isDragging: SharedValue<0 | 1>;
  draggedItemId: SharedValue<number | null>;
};

export const ListItem = ({
  item,
  currentSongPositions,
  draggedItemId,
  isDragging,
}: TListItem) => {
  const top = useSharedValue(item.id * SONG_HEIGHT);

  const currentSongPositionsDerived = useDerivedValue(() => {
    //this function will be run whenever currentSongPositions change
    return currentSongPositions.value;
  });

  const isDraggingDerived = useDerivedValue(() => {
    return isDragging.value;
  });

  const draggedItemIdDerived = useDerivedValue(() => {
    return draggedItemId.value;
  });

  const isCurrentDraggingItem = useDerivedValue(() => {
    return isDraggingDerived.value && draggedItemIdDerived.value === item.id;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: top.value,
      transform: [
        {
          scale: isCurrentDraggingItem.value
            ? interpolate(isDraggingDerived.value, [0, 1], [1, 1.025])
            : interpolate(isDraggingDerived.value, [0, 1], [1, 0.98]),
        },
      ],
      backgroundColor: isCurrentDraggingItem.value
        ? interpolateColor(
            isDraggingDerived.value,
            [0, 1],
            [Color_Pallete.metal_black, Color_Pallete.night_shadow],
          )
        : Color_Pallete.metal_black,

      shadowColor: isCurrentDraggingItem.value
        ? interpolateColor(
            isDraggingDerived.value,
            [0, 1],
            [Color_Pallete.metal_black, Color_Pallete.crystal_white],
          )
        : undefined,
      shadowOffset: {
        width: 0,
        height: isCurrentDraggingItem.value
          ? interpolate(isDraggingDerived.value, [0, 1], [0, 7])
          : 0,
      },
      shadowOpacity: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 0.2])
        : 0,
      shadowRadius: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 10])
        : 0,
      elevation: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 5])
        : 0, // For Android,
      zIndex: isCurrentDraggingItem.value ? 1 : 0,
    };
  }, [draggedItemIdDerived.value, isDraggingDerived.value]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      //start dragging
      isDragging.value = withSpring(1);

      //keep track of dragged item
      draggedItemId.value = item.id;
    })
    .onEnd(() => {
      //stop dragging
      isDragging.value = withDelay(200, withSpring(0));
    });

  return (
    <Animated.View key={item.id} style={[styles.itemContainer, animatedStyles]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.imageSrc,
          }}
          style={styles.image}
          borderRadius={8}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description1}>{item.title}</Text>
        <Text style={styles.description2}>{item.singer}</Text>
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.draggerContainer}>
          <View style={[styles.dragger, styles.marginBottom]} />
          <View style={[styles.dragger, styles.marginBottom]} />
          <View style={styles.dragger} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: SONG_HEIGHT,
    flexDirection: 'row',
    position: 'absolute',
  },
  imageContainer: {
    height: SONG_HEIGHT,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '3%',
  },
  descriptionContainer: {
    width: '60%',
    justifyContent: 'space-evenly',
  },
  description1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color_Pallete.crystal_white,
  },
  description2: {color: Color_Pallete.silver_storm},
  draggerContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginBottom: {
    marginBottom: 5,
  },
  dragger: {
    width: '30%',
    height: 2,
    backgroundColor: Color_Pallete.crystal_white,
  },
  image: {
    height: SONG_HEIGHT - 20,
    width: '97%',
  },
});
