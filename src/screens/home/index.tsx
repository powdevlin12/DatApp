import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  const {LoginModule} = NativeModules;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => LoginModule.showLoginScreen()}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
