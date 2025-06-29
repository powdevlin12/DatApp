import {RESULTS, requestNotifications} from 'react-native-permissions';
import {messaging} from '../..';

export const requestNotificationsPermission = (
  onGranted: () => void,
  onBlocked?: () => void,
) => {
  requestNotifications(['alert', 'sound', 'badge']).then(({status}) => {
    if (status === RESULTS.GRANTED) {
      onGranted();
    } else {
      onBlocked?.();
    }
  });
};

export const getDevicesToken = async () => {
  try {
    const token = await messaging.getToken();
    console.log({
      token,
    });
    return token;
  } catch (error) {
    console.log('error get token ' + error);
  }
};
