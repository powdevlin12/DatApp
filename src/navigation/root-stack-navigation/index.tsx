import {useNavigation} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import React, {useEffect, useCallback} from 'react';
import {Linking} from 'react-native';
import SCREEN_NAME from '../../constants/screen-name';
import MainStackNavigator, {MainStackParamList} from '../main-stack-navigation';
import useHandleDeepLink from '../../hooks/use-handle-deep-link';

export type RootStackParamsList = {
  Main: undefined;
};

const RootStackNavigation = () => {
  const Stack = createStackNavigator<RootStackParamsList>();

  const {
    actions: {handleDeepLink},
  } = useHandleDeepLink();

  useEffect(() => {
    // Handle deep link when app is in foreground
    const subscription = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    // Handle deep link when app is launched from background
    Linking.getInitialURL().then(url => {
      handleDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, [handleDeepLink]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={SCREEN_NAME.MAIN}>
      <Stack.Screen name={SCREEN_NAME.MAIN} component={MainStackNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
