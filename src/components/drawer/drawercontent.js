import React, { Component } from 'react';
import {
  ScrollView,
  AsyncStorage,
  Text,
  Image,
} from 'react-native';
import { Button } from 'native-base';
import { NavigationActions } from 'react-navigation';
import FCM from 'react-native-fcm';
import style from './style';
import * as avatarimage from '../../api/config';
import * as services from '../../api/services';

const DeviceInfo = require('react-native-device-info');

class DrawerContent extends Component {
  handlechange() {
    AsyncStorage.getItem('userdata', (err, result) => {
      const rounds = JSON.parse(result);
      const deviceId = DeviceInfo.getUniqueID();
      AsyncStorage.getItem('user', (err, result) => {
        const user = JSON.parse(result);
        services.logOut(user.email, deviceId).then((results) => {
          const success = results.data.error;
          if (success === 0) {
            const email = { email: '' };
            const data = '';
            AsyncStorage.setItem('user', JSON.stringify(email));
            AsyncStorage.setItem('userdata', JSON.stringify(data));
            FCM.removeAllDeliveredNotifications();
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Main' }),
              ],
              key: null,
            });
            this.props.navigation.dispatch(resetAction);
          }
        });
      });
    });
  }
  render() {
    return (
      <ScrollView style={style.outerContainer}>
        <Image
          style={style.drawerLogo}
          resizeMode="contain"
          source={avatarimage}
        />
        <Button transparent info onPress={() => { this.handlechange(); }}>
          <Text style={style.drawerText}>Log Out</Text>
        </Button>
      </ScrollView>
    );
  }
}
export default DrawerContent;
