/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import HomePage from '../components/home/home';
import * as action from '../action/actions';
import { listenNotification, handleNotification } from '../service/notification';
import { NavigationActions } from 'react-navigation';

const DeviceInfo = require('react-native-device-info');

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: '',
      username: '',
      refreshing: false,
      isClicked: false,
    };
    this._handleSignOut = this._handleSignOut.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
  }
  componentWillMount() {
    listenNotification().then((notif) => {
      if (notif !== undefined) {
        handleNotification(notif).then((handle) => {
          this.setState({ refreshing: true });
          this.props.onLogin({ email: handle.email, registrationid: handle.registrationid });
        });
      }
    });
    if (this.props.user.userLogin.isSuccess) {
      const userData = this.props.user.userLogin.data.data;
      this.setState({ username: userData, userinfo: userData.rounds });
    }
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      const success = props.user.userLogin.data.data;
      this.setState({ username: success, userinfo: success.rounds, refreshing: false });
    }
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
  _handleRefresh() {
    AsyncStorage.getItem('user', (err, result) => {
      this.setState({ refreshing: true });
      const user = JSON.parse(result);
      this.props.onLogin({ email: user.email, registrationid: user.registrationid });
    });
  }
  _onListItemPress(item) {
    const roundMark = this.state.isClicked;
    if (!roundMark && item.status == 1) {
      this.setState({ isClicked: true });
    } else if (roundMark && item.status == 1) {
      this.setState({ isClicked: false });
    }
  }
  _handleSignOut() {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result);
      const deviceId = DeviceInfo.getUniqueID();
      this.props.onLogOut({ email: user.email, deviceId });
    });
  }
  render() {
    return (
      <HomePage
        userinfo={this.state.userinfo}
        username={this.state.username}
        refreshing={this.state.refreshing}
        isClicked={this.state.isClicked}
        onListItemPress={(item) => { this._onListItemPress(item); }}
        handleSignOut={() => { this._handleSignOut(); }}
        handleRefresh={() => { this._handleRefresh(); }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  onLogin: (emailid, registrationid) => dispatch(action.userLoginRequest(emailid, registrationid)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
  onLogOut: (userId, deviceId) => dispatch(action.userLogoutRequest(userId, deviceId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
