import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlertIOS, AsyncStorage, Platform, ToastAndroid, NetInfo } from 'react-native';
import FCM from 'react-native-fcm';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import branch from 'react-native-branch';
import MainPage from '../components/main/main';
import * as action from '../action/actions';
import { listenNotification, handleNotification } from '../service/notification';
import { IsConnect } from '../service/connection';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      isAvailable: true,
      registrationid: '',
      isNetwork: true,
      bundle: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleNetwork = this.handleNetwork.bind(this);
  }
  componentWillMount(props) {
    this.setState({ isAvailable: false });
    if (this.props.user.userLogin.isSuccess) {
      this.setState({ isAvailable: true });
    }
    FCM.requestPermissions();
    FCM.getFCMToken().then((token) => {
      this.setState({
        token,
        deviceId: DeviceInfo.getUniqueID(),
      });
    });
    listenNotification().then((notif) => {
      if (notif !== undefined) {
        handleNotification(notif).then((data) => {
          const handle = JSON.parse(data);
          this.setState({ registrationid: handle.registrationid });
          this.props.onLogin({ registration_id: handle.registrationid });
        });
      }
    });
    IsConnect().then((data) => {
      if (data) {
        this.setState({ isNetwork: true });
      } else {
        this.setState({ isNetwork: false });
      }
    });
    branch.subscribe((bundle) => {
      if (bundle && bundle.params && !bundle.error && bundle.params.$deeplink_path) {
        this.setState({ isAvailable: false, bundle: true });
        const registrationid = bundle.params.$deeplink_path;
        this.setState({ registrationid });
        this.props.onLogin({ registration_id: registrationid });
      } else {
        AsyncStorage.getItem('user', (err, result) => {
          if (result !== null) {
            const user = JSON.parse(result);
            if (user.registrationid !== '') {
              this.setState({ registrationid: user.registrationid });
              if (this.state.isNetwork) {
                this.props.onLogin({ registration_id: user.registrationid });
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
            this.setState({ isAvailable: true });
          }
        });
      }
    });
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleNetwork);
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleNetwork);
  }
  handleNetwork(isconnect) {
    this.setState({ isNetwork: isconnect });
  }
  _handleSubmit() {
    this.setState({ isAvailable: false });
    if (this.state.registrationid !== '' && this.state.isNetwork) {
      this.props.onLogin({ registration_id: this.state.registrationid });
    } else if (this.state.registrationid === '') {
      this.setState({ isAvailable: true });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('Enter Registration Id', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('Enter Registration Id');
      }
    } else if (this.state.isNetwork === false) {
      this.setState({ isAvailable: true });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('No Connection', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('No Connection');
      }
    }
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      this.props.onDeviceSave({ email_id: props.user.userLogin.data.data.email, device_id: this.state.deviceId, token: this.state.token });
      const success = props.user.userLogin.data.data;
      AsyncStorage.setItem('user', JSON.stringify({ registrationid: this.state.registrationid }));
      AsyncStorage.setItem('userdata', JSON.stringify(success));
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(`Welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(`welcome ${success.name}`);
      }
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Drawer' }),
        ],
        key: 'Drawer',
      });
      this.props.navigation.dispatch(resetAction);
      this.setState({ isAvailable: true, registrationid: '' });
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
        isAvailable={this.state.isAvailable}
        bundle={this.state.bundle}
        registrationid={this.state.registrationid}
        handleSubmit={() => { this._handleSubmit(); }}
        handleKeyboardSubmit={() => { this._handleSubmit(); }}
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
  onLogin: registrationId => dispatch(action.userLoginRequest(registrationId)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
  onOfflineData: data => dispatch(action.userLoginSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
