/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './gesture-handler';
import {getApp} from '@react-native-firebase/app';
import {getMessaging} from '@react-native-firebase/messaging';
if (__DEV__) {
  require('./ReactotronConfig');
}

const firebaseApp = getApp();
export const messaging = getMessaging(firebaseApp);

messaging.setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
