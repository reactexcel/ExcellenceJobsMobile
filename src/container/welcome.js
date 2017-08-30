/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, Linking, NetInfo, Platform, ToastAndroid, AlertIOS } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { listenNotification, handleNotification } from '../service/notification';
import { IsConnect } from '../service/connection';
import * as action from '../action/actions';
import HomePage from '../components/home/home';
import CustomHeader from '../components/header/header';
import style from '../components/home/styles';
import IconWithButton from '../components/button/buttonwithicon';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: [],
      refreshing: false,
      isClicked: false,
      isNetwork: true,
    };
    this._handleSignOut = this._handleSignOut.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleNetwork = this.handleNetwork.bind(this);
  }
  componentWillMount() {
    IsConnect().then((data) => {
      if (data) {
        this.setState({ isNetwork: true });
      } else {
        this.setState({ isNetwork: false });
      }
    });
    NetInfo.isConnected.addEventListener('change', this.handleNetwork);
    const ret = [];
    ret.push({
      coordinates: {
        latitude: this.props.user.userLogin.data.data.office_location.long,
        longitude: this.props.user.userLogin.data.data.office_location.lat,
      },
      title: 'Excellence Technologies',
      description: 'C 84, 3rd Floor sector 8, Noida',
    });
    this.setState({ marker: ret });
    listenNotification().then((notif) => {
      if (notif !== undefined) {
        handleNotification(notif).then((data) => {
          const handle = JSON.parse(data);
          this.setState({ refreshing: true });
          this.props.onLogin({ registration_id: handle.registrationid });
        });
      }
    });
    if (this.props.user.userLogin.isSuccess) {
      AsyncStorage.setItem('userInfo', JSON.stringify(this.props.user.userLogin.data));
    }
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      this.setState({ refreshing: false });
    }
    if (props.user.userLogout.isSuccess) {
      const data = { registrationid: '' };
      AsyncStorage.setItem('user', JSON.stringify(data));
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
  handleNetwork(isconnect) {
    this.setState({ isNetwork: isconnect });
  }
  _handleRefresh() {
    this.setState({ refreshing: true });
    if (this.state.isNetwork) {
      this.setState({ isNetwork: true });
      AsyncStorage.getItem('user', (err, result) => {
        const user = JSON.parse(result);
        this.props.onLogin({ registration_id: user.registrationid });
      });
    } else {
      this.setState({ refreshing: false });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('No Connection', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('No Connection');
      }
    }
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
      this.props.onLogOut({ email_id: this.props.user.userLogin.data.data.email, device_id });
    });
  }
  _redirectToMap() {
    let url = '';
    if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/maps?q=${this.props.user.userLogin.data.data.office_location.long},${this.props.user.userLogin.data.data.office_location.lat}`;
    } else if (Platform.OS === 'android') {
      url = `geo:${this.props.user.userLogin.data.data.office_location.long},${this.props.user.userLogin.data.data.office_location.lat}`;
    }
    Linking.openURL(url);
  }
  handleCall() {
    const phoneNumber = this.props.user.userLogin.data.data.app_hr_contact_number;
    Linking.openURL(`tel:${phoneNumber}`);
  }
  handleEmail() {
    const email = this.props.user.userLogin.data.data.app_hr_contact_email;
    Linking.openURL(`mailto:${email}`);
  }
  render() {
    const userData = this.props.user.userLogin.data.data;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader name={userData.name} onPress={() => this._handleSignOut()} isNetwork={this.state.isNetwork} />
        <HomePage
          marker={this.state.marker}
          userinfo={userData.rounds}
          username={userData}
          refreshing={this.state.refreshing}
          isClicked={this.state.isClicked}
          onListItemPress={(item) => { this._onListItemPress(item); }}
          handleRefresh={() => { this._handleRefresh(); }}
          openMap={() => { this._redirectToMap(); }}
          handleCall={() => { this.handleCall(); }}
          handleEmail={() => { this.handleEmail(); }}
        />
        <View style={style.emailContainer}>
          <IconWithButton style={style} handlePress={() => { this.handleCall(); }} iconName="ios-call-outline" textContent=" Contact Us" />
          <IconWithButton style={style} handlePress={() => { this.handleEmail(); }} iconName="ios-mail-outline" textContent=" Email Us" />
        </View>
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
  onLogin: registrationId => dispatch(action.userLoginRequest(registrationId)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
  onLogOut: (userId, deviceId) => dispatch(action.userLogoutRequest(userId, deviceId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
