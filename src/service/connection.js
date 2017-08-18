import { NetInfo } from 'react-native';

export default function IsConnect() {
  return (NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      return true;
    }
    return false;
  }));
}
