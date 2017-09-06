/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, Linking, NetInfo, Platform, ToastAndroid, AlertIOS, AppState } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import RatingRequestor from 'react-native-rating-requestor';
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
      mobileNumber: '',
      RatingTracker: '',
      refreshing: false,
      isClicked: true,
      isNetwork: true,
      showModal: false,
      refresh: false,
      isSubmit: false,
      jobTitle: false,
      rateDecline: false,
      rateDelay: true,
      rateAccept: 0,
    };
    this._handleSignOut = this._handleSignOut.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleNetwork = this.handleNetwork.bind(this);
    this.handleAppStatus = this.handleAppStatus.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.numberSubmit = this.numberSubmit.bind(this);
    this._handleJobTitlePress = this._handleJobTitlePress.bind(this);
    this.rateus = this.rateus.bind(this);
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      const rate = new RatingRequestor('com.excellence.jobs', [{
        title: 'string',
        message: 'string',
        actionLabels: {
        	decline: 'Never',
        	delay: 'Maybe Later',
        	accept: 'Rate Us',
        },
        timingFunction: {},
      }]);
      this.setState({ RatingTracker: rate });
    }
    AppState.addEventListener('change', this.handleAppStatus);
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
      description: 'C-86 B, Second Floor, sector 8, Noida',
    });
    this.setState({ marker: ret });
    if (this.props.user.userLogin.isSuccess) {
      this.setState({ mobileNumber: this.props.user.userLogin.data.data.mobile_no });
      AsyncStorage.setItem('userInfo', JSON.stringify(this.props.user.userLogin.data));
    }
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      this.setState({ mobileNumber: props.user.userLogin.data.data.mobile_no });
      this.setState({ refreshing: false });
      AsyncStorage.getItem('rateus', (err, result) => {
        if (result !== null) {
          const rate = JSON.parse(result);
          this.setState({ rateDelay: rate.rateDelay, rateAccept: rate.rateAccept, rateDecline: rate.rateDecline });
        }
      });
    }
    if (props.user.mobile.isSuccess) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(props.user.mobile.data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(props.user.mobile.data.message);
      }
      this.props.onLogin({ registration_id: props.user.userLogin.data.data.registration_id });
    }
    if (props.user.userLogout.isSuccess) {
      this.setState({ refresh: false });
      const data = { registrationid: '' };
      AsyncStorage.setItem('user', JSON.stringify(data));
      AsyncStorage.setItem('rateus', JSON.stringify({ rateDecline: false, rateDelay: true, rateAccept: 0 }));
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
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleNetwork);
  }
  handleNetwork(isconnect) {
    this.setState({ isNetwork: isconnect });
  }
  handleAppStatus() {
    if (AppState.currentState === 'active') {
      listenNotification().then((notif) => {
        if (notif !== undefined) {
          handleNotification(notif).then((data) => {
            const handle = JSON.parse(data);
            this.setState({ refreshing: true });
            this.props.onLogin({ registration_id: handle.registrationid });
          });
        }
      });
    } else {
      listenNotification().then((notif) => {
        if (notif !== undefined) {
          handleNotification(notif).then((data) => {
            const handle = JSON.parse(data);
            this.setState({ refreshing: true });
            this.props.onLogin({ registration_id: handle.registrationid });
          });
        }
      });
    }
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
    this.setState({ refresh: true });
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
  showModal() {
    this.setState({ showModal: true });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  handleNumberChange(number) {
    this.setState({ mobileNumber: number });
  }
  numberSubmit(number) {
    this.setState({ isSubmit: true });
    if (/^[0-9]{10}$/.test(+number)) {
      this.setState({ isSubmit: false });
      this.setState({ showModal: false });
      const newnumber = `+91${number}`;
      this.props.onMobileNumberUpdate({
        email_id: this.props.user.userLogin.data.data.email,
        registration_id: this.props.user.userLogin.data.data.registration_id,
        mobile_no: newnumber });
    } else {
      this.setState({ isSubmit: false });
      this.setState({ showModal: false });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('Enter Vaild Mobile Number', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('Enter Vaild Mobile Number');
      }
    }
  }
  rateus() {
    this.state.RatingTracker.handlePositiveEvent((didAppear, userDecision) => {
      if (didAppear) {
        switch (userDecision) {
          case 'decline':
            AsyncStorage.setItem('rateus', JSON.stringify({ rateDecline: true, rateDelay: false, rateAccept: this.state.rateAccept }));
            this.setState({ rateDecline: true, rateDelay: false });
            break;
          case 'delay' :
            AsyncStorage.setItem('rateus', JSON.stringify({ rateDecline: this.state.rateDecline, rateDelay: true, rateAccept: this.state.rateAccept }));
            this.setState({ rateDelay: true });
            break;
          case 'accept' :
            AsyncStorage.setItem('rateus', JSON.stringify({ rateDecline: this.state.rateDecline, rateDelay: this.state.rateDelay, rateAccept: this.state.rateAccept + 1 }));
            this.setState({ rateAccept: this.state.rateAccept + 1 });
            break;
        }
      }
    });
  }
  _handleJobTitlePress() {
    this.setState({ jobTitle: !this.state.jobTitle });
  }
  render() {
    if (!this.state.rateDecline && this.state.rateDelay) {
      setInterval(() => { this.rateus(); }, 50000);
    }
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
          modal={this.state.showModal}
          showModal={this.showModal}
          closeModal={this.closeModal}
          handleNumberChange={this.handleNumberChange}
          numberSubmit={this.numberSubmit}
          number={this.state.mobileNumber}
          refresh={this.state.refresh}
          isSubmit={this.state.isSubmit}
          onJobTitlePress={() => { this._handleJobTitlePress(); }}
          jobTitle={this.state.jobTitle}
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
  onMobileNumberUpdate: (emailId, registrationId, mobileNumber) => dispatch(action.mobileNumberUpdateRequest(emailId, registrationId, mobileNumber)),
  onLogOut: (userId, deviceId) => dispatch(action.userLogoutRequest(userId, deviceId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
