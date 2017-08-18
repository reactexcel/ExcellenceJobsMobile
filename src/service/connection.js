import { NetInfo } from 'react-native';

export function IsConnect() {
  return (NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      return true;
    }
    return false;
  }));
}
