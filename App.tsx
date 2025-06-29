/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SCREEN_NAME from './src/constants/screen-name';
import RootStackNavigation from './src/navigation/root-stack-navigation';
import {
  getDevicesToken,
  requestNotificationsPermission,
} from './src/utils/notifications';

// * NOTIFICATION
export const isIos = () => Platform.OS === 'ios';
export const isAndroid = () => Platform.OS === 'android';
export const getPlatformVersion = () => Number(Platform.Version);

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

  useEffect(() => {
    if (isIos() || (isAndroid() && getPlatformVersion() >= 33)) {
      requestNotificationsPermission(
        () => {
          //notification granted tasks
          console.log('ALLOW');
        },
        () => {
          //notification denied tasks
          console.log('DISABLE');
        },
      );
    }
  }, []);

  useEffect(() => {
    getDevicesToken();
  }, []);

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
