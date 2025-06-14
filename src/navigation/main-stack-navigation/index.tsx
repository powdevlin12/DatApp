import SCREEN_NAME from '../../constants/screen-name';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  HomeScreen,
  ListViewNative,
  MenuScreen,
  TodoListNative,
} from '../../screens';
import ProfileDetailScreen from '../../screens/profile-detail';
import ProfileScreen from '../../screens/profile';

export type MainStackParamList = {
  [SCREEN_NAME.HOME]: undefined;
  [SCREEN_NAME.PROFILE]: undefined;
  [SCREEN_NAME.PROFILE_DETAIL]: {
    userID: string;
  };
  [SCREEN_NAME.TODO_LIST_NATIVE]: undefined;
  [SCREEN_NAME.MENU_SCREEN]: undefined;
  [SCREEN_NAME.LIST_VIEW_NATIVE]: undefined;
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
      initialRouteName={SCREEN_NAME.MENU_SCREEN}>
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
      <Stack.Screen
        name={SCREEN_NAME.TODO_LIST_NATIVE}
        component={TodoListNative}
        options={{
          title: 'My Todo',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.MENU_SCREEN}
        component={MenuScreen}
        options={{
          title: 'Menu',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.LIST_VIEW_NATIVE}
        component={ListViewNative}
        options={{
          title: 'List View Native',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
