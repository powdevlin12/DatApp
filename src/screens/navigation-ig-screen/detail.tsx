import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RootNativeStackParamList} from '.';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StackNavigationProp} from '@react-navigation/stack';
import {SCREEN_SIZE} from '../../utils/screen_size';

interface IProps {}

type DetailScreenRouteProp = RouteProp<RootNativeStackParamList, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootNativeStackParamList,
  'Detail'
>;

function clamp(val: any, min: any, max: any) {
  return Math.min(Math.max(val, min), max);
}

const DetailScreen: React.FC<IProps> = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {data, from, parentId, callback} = route.params;
  const navigation = useNavigation<DetailScreenNavigationProp>();

  const parentTransitionTag = useMemo(() => {
    if (from) {
      return from + data.id.toString();
    }
    return data.id.toString();
  }, [data.id, from]);

  const childrenTransitionTag = useMemo(() => {
    if (from) {
      return from + data.id.toString() + parentId?.toString();
    }
    return data.id.toString() + parentId?.toString();
  }, [data.id, parentId, from]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ['transparent', '#262626'],
    ),
    borderRadius: 20,
    overflow: 'hidden',
  }));

  // const gesture = Gesture.Pan().onTouchesUp(() => {
  //   'worklet';
  //   runOnJS(navigation.goBack)();
  // });

  const gesture = Gesture.Pan()
    .onUpdate(value => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY,
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, {duration: 300});
    })
    .onEnd(() => {
      if (translateY.value > 50 || translateX.value > 90) {
        opacity.value = 0;
        callback && runOnJS(callback)();
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, {duration: 100});
        translateY.value = withTiming(0, {duration: 100});
        scale.value = withTiming(1, {duration: 300});
        opacity.value = withTiming(1, {duration: 400});
      }
    });

  const pan = Gesture.Pan()
    // .minDistance(1)
    // .onStart(() => {
    //   prevTranslationX.value = translateX.value;
    //   prevTranslationY.value = translateY.value;
    // })
    .onUpdate(value => {
      // const maxTranslateX = SCREEN_SIZE.WIDTH_SCREEN / 2 - 50;
      // const maxTranslateY = SCREEN_SIZE.HEIGHT_SCREEN / 2 - 50;

      // translateX.value = clamp(
      //   prevTranslationX.value + event.translationX,
      //   -maxTranslateX,
      //   maxTranslateX,
      // );
      // translateY.value = clamp(
      //   prevTranslationY.value + event.translationY,
      //   -maxTranslateY,
      //   maxTranslateY,
      // );

      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY,
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, {duration: 300});
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        sharedTransitionTag={parentTransitionTag}>
        <Animated.Image
          sharedTransitionTag={childrenTransitionTag}
          src={data.image}
          style={[styles.image]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: '1/1',
    justifyContent: 'center',
  },
});

export default DetailScreen;
