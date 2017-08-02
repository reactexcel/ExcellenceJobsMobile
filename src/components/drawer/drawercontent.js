import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import * as action from '../../action/actions';

const DeviceInfo = require('react-native-device-info');

class DrawerContent extends Component {
  handlechange() {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result);
      const deviceId = DeviceInfo.getUniqueID();
      this.props.onLogOut({ email: user.email, deviceId });
    });
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogout.isSuccess) {
      const email = { email: '' };
      const data = '';
      AsyncStorage.setItem('user', JSON.stringify(email));
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
        key: null,
      });
      this.props.navigation.dispatch(resetAction);
    }
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

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  onLogOut: (userId, deviceId) => dispatch(action.userLogoutRequest(userId, deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
