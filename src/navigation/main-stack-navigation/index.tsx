import SCREEN_NAME from '../../constants/screen-name';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {HomeScreen} from '../../screens';

export type MainStackParamList = {
  [SCREEN_NAME.HOME]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={SCREEN_NAME.HOME}>
      <Stack.Screen name={SCREEN_NAME.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
