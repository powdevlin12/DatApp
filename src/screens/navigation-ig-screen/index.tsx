import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import DetailsScreen from './detail';
import HomeScreen from './home';
import Post from './post';
import {IPost} from './components/post-component';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export type RootNativeStackParamList = {
  Home: undefined;
  Detail: {
    data: {id: number; image: string};
    from?: any;
    parentId?: number;
    callback?: () => void;
  };
  Post: {data: IPost};
};

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

const NavigationIgScreen = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          options={{
            headerShown: false,
            // presentation: 'transparentModal',
            headerBackTitle: 'Back',
            headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerStyle: {
              backgroundColor: '#262626',
            },
            // headerBackTitle: '',
            // headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default NavigationIgScreen;
