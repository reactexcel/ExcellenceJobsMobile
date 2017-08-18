import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlertIOS, AsyncStorage, Platform, ToastAndroid, NetInfo } from 'react-native';
import FCM from 'react-native-fcm';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import MainPage from '../components/main/main';
import * as action from '../action/actions';
import { listenNotification, handleNotification } from '../service/notification';
import IsConnect from '../service/connection';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isloading: false,
      isAvailable: true,
      registrationid: '',
      isNetwork: true,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  componentWillMount() {
    IsConnect().then((data) => {
      if (data) {
        this.setState({ isNetwork: true });
      } else {
        this.setState({ isNetwork: false });
      }
    });
    FCM.requestPermissions();
    FCM.getFCMToken().then((token) => {
      this.setState({
        token,
        deviceId: DeviceInfo.getUniqueID(),
      });
    });
    this.setState({ isAvailable: false });
    listenNotification().then((notif) => {
      if (notif !== undefined) {
        handleNotification(notif).then((data) => {
          const handle = JSON.parse(data);
          this.setState({ email: handle.email, registrationid: handle.registrationid });
          this.props.onLogin({ email_id: handle.email, registration_id: handle.registrationid });
        });
      }
    });
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        const user = JSON.parse(result);
        if (user.email !== '') {
          this.setState({ email: user.email, registrationid: user.registrationid });
          if (this.state.isNetwork) {
            this.props.onLogin({ email_id: user.email, registration_id: user.registrationid });
          } else {
            AsyncStorage.getItem('userInfo', (err, result) => {
              const data = JSON.parse(result);
              this.props.onOfflineData({ data });
            });
          }
        } else {
          this.setState({ isAvailable: true });
        }
      } else {
        this.setState({ isAvailable: false });
      }
    });
  }
  _handleSubmit() {
    this.setState({ isAvailable: false });
    if (this.state.email !== '') {
      this.props.onLogin({ email_id: this.state.email, registration_id: this.state.registrationid });
    } else {
      this.setState({ isAvailable: true, email: '' });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('Enter Your Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('Enter Your Email');
      }
    }
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      this.props.onDeviceSave({ email_id: this.state.email, device_id: this.state.deviceId, token: this.state.token });
      const success = props.user.userLogin.data.data;
      AsyncStorage.setItem('user', JSON.stringify({ email: this.state.email, registrationid: this.state.registrationid }));
      AsyncStorage.setItem('userdata', JSON.stringify(success));
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(`welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(`welcome ${success.name}`);
      }
      this.setState({ isAvailable: true, email: '', registrationid: '' });
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Drawer' }),
        ],
        key: 'Drawer',
      });
      this.props.navigation.dispatch(resetAction);
    } else if (props.user.userLogin.isError) {
      this.setState({ isAvailable: true });
      const error = props.user.userLogin.error;
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(error.message);
      }
    }
  }
  render() {
    return (
      <MainPage
        email={this.state.email}
        isAvailable={this.state.isAvailable}
        registrationid={this.state.registrationid}
        handleSubmit={() => { this._handleSubmit(); }}
        changeText={(text) => { this.setState({ email: text }); }}
        changeId={(text) => { this.setState({ registrationid: text }); }}
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
  onLogin: (emailId, registrationId) => dispatch(action.userLoginRequest(emailId, registrationId)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
  onOfflineData: data => dispatch(action.userLoginSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
