import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../navigation/main-stack-navigation';
import SCREEN_NAME from '../../constants/screen-name';
import useHandleDeepLink from '../../hooks/use-handle-deep-link';

type ProfileDetailScreenRouteProp = RouteProp<
  MainStackParamList,
  typeof SCREEN_NAME.PROFILE_DETAIL
>;

const ProfileDetailScreen = () => {
  const route = useRoute<ProfileDetailScreenRouteProp>();
  const {userID} = route.params;

  console.log('ProfileDetailScreen - userID:', userID);

  const {
    actions: {handleDeepLink},
  } = useHandleDeepLink();

  const onPress = async (url: string) => {
    const isOpen = await Linking.canOpenURL(url);
    console.log('🚀 ~ onPress ~ isOpen:', isOpen);
    if (isOpen) {
      handleDeepLink(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Detail Screen</Text>
      <Text style={styles.text}>User ID: {userID}</Text>
      <TouchableOpacity onPress={() => onPress('datapp://home')}>
        <Text>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
