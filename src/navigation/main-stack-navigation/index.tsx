import SCREEN_NAME from '../../constants/screen-name';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {HomeScreen} from '../../screens';
import ProfileDetailScreen from '../../screens/profile-detail';
import ProfileScreen from '../../screens/profile';

export type MainStackParamList = {
  [SCREEN_NAME.HOME]: undefined;
  [SCREEN_NAME.PROFILE]: undefined;
  [SCREEN_NAME.PROFILE_DETAIL]: {
    userID: string;
  };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={SCREEN_NAME.HOME}>
      <Stack.Screen
        name={SCREEN_NAME.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen name={SCREEN_NAME.PROFILE} component={ProfileScreen} />
      <Stack.Screen
        name={SCREEN_NAME.PROFILE_DETAIL}
        component={ProfileDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
