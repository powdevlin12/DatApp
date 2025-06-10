import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  console.log('Home sreen');
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
