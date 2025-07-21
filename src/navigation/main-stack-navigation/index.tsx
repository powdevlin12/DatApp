import SCREEN_NAME from '../../constants/screen-name';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  AnimatedScreen,
  DragAndDropScreen,
  HomeScreen,
  ListViewNative,
  MenuScreen,
  ModalScreen,
  NavigationIgScreen,
  SliderScreen,
  SQLLiteScreen,
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
  [SCREEN_NAME.SLIDER_SCREEN]: undefined;
  [SCREEN_NAME.ANIMATED_SCREEN]: undefined;
  [SCREEN_NAME.DRAG_AND_DROP]: undefined;
  [SCREEN_NAME.NAVIGATION_IG_SCREEN]: undefined;
  [SCREEN_NAME.MODAL_SCREEN]: undefined;
  [SCREEN_NAME.SQL_LITE_SCREEN]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false,
          // gestureEnabled: true,
          // ...TransitionPresets.SlideFromRightIOS,
        }
      }
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
      <Stack.Screen
        name={SCREEN_NAME.SLIDER_SCREEN}
        component={SliderScreen}
        options={{
          title: 'Sliderr',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.ANIMATED_SCREEN}
        component={AnimatedScreen}
        options={{
          title: 'Animated',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.DRAG_AND_DROP}
        component={DragAndDropScreen}
        options={{
          title: 'DragAnddrop',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.NAVIGATION_IG_SCREEN}
        component={NavigationIgScreen}
        options={{
          title: 'Instagram',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.MODAL_SCREEN}
        component={ModalScreen}
        options={{
          title: 'Modal',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.SQL_LITE_SCREEN}
        component={SQLLiteScreen}
        options={{
          title: 'SQL Lite',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
