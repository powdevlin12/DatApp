import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedScreen = () => {
  const bgColor = useSharedValue('blue');
  const circleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  }, []);

  const changeColor = () => {
    'worklet';
    bgColor.value = 'red';
    bgColor.value = withTiming('green', {duration: 1000});
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, circleStyle]} />
      <Button title="Change color" onPress={changeColor} />
    </View>
  );
};

export default AnimatedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
