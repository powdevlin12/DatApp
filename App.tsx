/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SCREEN_NAME from './src/constants/screen-name';
import RootStackNavigation from './src/navigation/root-stack-navigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['datapp://'],
    config: {
      screens: {
        [SCREEN_NAME.MAIN]: {
          screens: {
            [SCREEN_NAME.HOME]: 'home',
            [SCREEN_NAME.PROFILE]: 'profile',
            [SCREEN_NAME.PROFILE_DETAIL]: 'profile-detail/:userID',
          },
        },
      },
    },
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer linking={linking}>
          <RootStackNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
