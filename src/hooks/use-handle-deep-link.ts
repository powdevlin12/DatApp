import {useCallback} from 'react';
import SCREEN_NAME from '../constants/screen-name';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../navigation/main-stack-navigation';

const useHandleDeepLink = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const handleDeepLink = useCallback(
    (url: string | null) => {
      console.log('Deep Link Received:', url);

      if (url) {
        try {
          const pathParts = url.slice(url.indexOf('://') + 3);
          const screen = pathParts;
          const param = '123';

          console.log({
            screen,
            param,
          });

          if (screen === SCREEN_NAME.PROFILE) {
            navigation.navigate(SCREEN_NAME.PROFILE);
          } else if (screen === SCREEN_NAME.PROFILE_DETAIL && param) {
            navigation.navigate(SCREEN_NAME.PROFILE_DETAIL, {userID: param});
          } else {
            navigation.navigate(SCREEN_NAME.HOME);
          }
        } catch (error) {
          console.error('Error parsing deep link:', error);
        }
      }
    },
    [navigation],
  );

  return {
    actions: {
      handleDeepLink,
    },
  };
};

export default useHandleDeepLink;
