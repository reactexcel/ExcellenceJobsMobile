import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TextInput, View, AlertIOS, AsyncStorage, Platform, ToastAndroid, ActivityIndicator, AppState, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Label, Form } from 'native-base';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';
import style from './styles';
import * as services from '../../api/services';
import * as action from '../../action/actions';
import { HEXCOLOR } from '../../style/hexcolor';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isloading: false,
      isAvailable: true,
    };
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
  handleSubmit() {
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
  render() {
    return (
      <View style={style.outerContainer}>
        <StatusBar backgroundColor={HEXCOLOR.PickledBluewood} barStyle="light-content" />
        <View style={style.innerContainer}>
          <View style={style.viewHeight} >
            <Image source={require('../../image/logo.jpg')} resizeMode="contain" style={style.logo} />
          </View>
          {this.state.isAvailable ? (<View style={style.content}>
            <Form>
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center', color: HEXCOLOR.WhiteColor }}> Enter Your Email</Label>
                <Input style={style.inputStyle} value={this.state.email} onChangeText={(text) => { this.setState({ email: text }); }} />
              </Item>
              <Button rounded style={style.button} onPress={() => { this.handleSubmit(); }} >
                <Text style={style.buttonText}>Go</Text>
              </Button>
            </Form>
          </View>) : (
            <ActivityIndicator animating color={HEXCOLOR.BahamaBlue} size="large" />
          )}
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
  onLogin: emailid => dispatch(action.userLoginRequest(emailid)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
