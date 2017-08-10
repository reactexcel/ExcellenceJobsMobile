/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, ScrollView, View, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { listenNotification, handleNotification } from '../service/notification';
import * as action from '../action/actions';
import HomePage from '../components/home/home';
const DeviceInfo = require('react-native-device-info');

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: [],
      refreshing: false,
      isClicked: false,
    };
    this._handleSignOut = this._handleSignOut.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
  }
  componentWillMount() {
    const ret = [];
    ret.push({
      coordinates: {
        latitude: 28.596048,
        longitude: 77.328188,
      },
      title: 'Excellence Technologies ',
      description: 'C 84, 3rd Floor sector 8, Noida',
    });
    this.setState({ marker: ret });
    listenNotification().then((notif) => {
      if (notif !== undefined) {
        handleNotification(notif).then((handle) => {
          this.setState({ refreshing: true });
          this.props.onLogin({ email_id: handle.email, registration_id: handle.registrationid });
        });
      }
    });
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      this.setState({ refreshing: false });
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
      this.props.onLogin({ email_id: user.email, registration_id: user.registrationid });
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
      const device_id = DeviceInfo.getUniqueID();
      this.props.onLogOut({ email_id: user.email, device_id });
    });
  }
  _redirectToMap() {
    Linking.canOpenURL('geo:28.596048,77.328188').then((supported) => {
      if (supported) {
        Linking.openURL('geo:28.596048,77.328188');
      } else {
        console.log('Don\'t know how to go');
      }
    }).catch(err => console.error('An error occurred', err));
  }
  render() {
    const userData = this.props.user.userLogin.data.data;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView >
          <HomePage
            marker={this.state.marker}
            userinfo={userData.rounds}
            username={userData}
            refreshing={this.state.refreshing}
            isClicked={this.state.isClicked}
            onListItemPress={(item) => { this._onListItemPress(item); }}
            handleSignOut={() => { this._handleSignOut(); }}
            handleRefresh={() => { this._handleRefresh(); }}
            openMap={() => { this._redirectToMap(); }}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  onLogin: (emailId, registrationId) => dispatch(action.userLoginRequest(emailId, registrationId)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
  onLogOut: (userId, deviceId) => dispatch(action.userLogoutRequest(userId, deviceId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
