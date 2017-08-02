import React, { Component } from 'react';
import MainPage from '../components/main/main';
import { connect } from 'react-redux';
import { AlertIOS, AsyncStorage, Platform, ToastAndroid } from 'react-native';
import * as action from '../action/actions';
import FCM from 'react-native-fcm';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isloading: false,
      isAvailable: true,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
  }
  componentWillMount() {
    FCM.getFCMToken().then((token) => {
      this.setState({
        token,
        deviceId: DeviceInfo.getUniqueID(),
      });
    });
    this.setState({ isAvailable: false });
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        FCM.getInitialNotification().then((notif) => {
          if (notif && notif.body !== undefined) {
            this.handleNotification(notif);
          }
        });
        const user = JSON.parse(result);
        if (user.email !== '') {
          this.setState({ email: user.email });
          this.props.onLogin({ email: user.email });
        } else {
          this.setState({ isAvailable: true });
        }
      } else {
        this.setState({ isAvailable: true });
      }
    });
  }
  _handleSubmit() {
    this.setState({ isAvailable: false });
    if (this.state.email !== '') {
      this.props.onLogin({ email: this.state.email });
    } else {
      this.setState({ isAvailable: true, email: '' });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('Enter Your Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('Enter Your Email');
      }
    }
  }
  handleNotification(data) {
    FCM.removeAllDeliveredNotifications(data);
    FCM.cancelAllLocalNotifications();
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        const user = JSON.parse(result);
        if (user.email !== '') {
          this.setState({ email: user.email });
          this.props.onLogin({ email: user.email });
        }
      }
    });
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      this.props.onDeviceSave({ email: this.state.email, device: this.state.deviceId, token: this.state.token });
      const success = props.user.userLogin.data.data;
      AsyncStorage.setItem('user', JSON.stringify({ email: this.state.email }));
      AsyncStorage.setItem('userdata', JSON.stringify(success));
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(`welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(`welcome ${success.name}`);
      }
      this.setState({ isAvailable: true, email: '' });
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Drawer' }),
        ],
        key: 'Drawer',
      });
      this.props.navigation.dispatch(resetAction);
    } else if (props.user.userLogin.isError) {
      this.setState({ isAvailable: true, email: '' });
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
        handleSubmit={() => { this._handleSubmit(); }}
        changeText={(text) => { this.setState({ email: text }); }}
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
  onLogin: emailid => dispatch(action.userLoginRequest(emailid)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
