import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/main-stack-navigation';
import SCREEN_NAME from '../../constants/screen-name';
import {useNavigation} from '@react-navigation/native';

type TMenuItem = {
  title: string;
  id: number;
  onPress: () => void;
};

type NavigationProp = StackNavigationProp<
  MainStackParamList,
  typeof SCREEN_NAME.MENU_SCREEN
>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const {ListViewModule} = NativeModules;

  const menuList: TMenuItem[] = [
    {
      id: 1,
      onPress: () => navigation.navigate(SCREEN_NAME.HOME),
      title: 'Home',
    },
    {
      id: 2,
      onPress: () => navigation.navigate(SCREEN_NAME.TODO_LIST_NATIVE),
      title: 'Todo Native Android',
    },
    {
      id: 3,
      onPress: () => ListViewModule.handleGetIntentListView(),
      title: 'ListView Native Android',
    },
  ];
  return (
    <View style={styles.container}>
      {menuList.map(menu => {
        return (
          <TouchableOpacity
            key={menu.id}
            onPress={menu.onPress}
            style={styles.menuItem}>
            <Text style={{fontWeight: 500, fontSize: 15}}>{menu.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    rowGap: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
