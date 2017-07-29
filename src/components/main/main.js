import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, TextInput, View, AlertIOS, AsyncStorage, Platform, ToastAndroid, ActivityIndicator, AppState, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Label, Form } from 'native-base';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';

import style from './styles';
import * as services from '../../api/service';
import * as action from '../../action/actions';

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
          services.getData(user.email).then((results) => {
            const success = results.data.data;
            AsyncStorage.setItem('userdata', JSON.stringify(success));
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Drawer' }),
              ],
              key: 'Drawer',
            });
            this.props.navigation.dispatch(resetAction);
          });
        } else {
          this.setState({ isAvailable: true });
        }
      } else {
        this.setState({ isAvailable: true });
      }
    });
  }
  handleNotification(data) {
    FCM.removeAllDeliveredNotifications(data);
    FCM.cancelAllLocalNotifications();
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        const user = JSON.parse(result);
        if (user.email !== '') {
          services.getData(user.email).then((result) => {
            if (result.data.error === 0) {
              const success = result.data.data;
              AsyncStorage.setItem('userdata', JSON.stringify(success));
            }
          });
        }
      }
    });
  }
  handleSubmit() {
    const emailid = this.state.email;
    this.props.onLogin(emailid);
    // this.setState({ isAvailable: false });
    // const emailid = this.state.email;
    // if (emailid !== '') {
    //   services.getData(emailid).then((result) => {
    //     if (result.data.error === 0) {
    //       const success = result.data.data;
    //       const email = { email: emailid };
    //       AsyncStorage.setItem('user', JSON.stringify(email));
    //       AsyncStorage.setItem('userdata', JSON.stringify(success));
    //       FCM.getFCMToken().then((token) => {
    //         const fcmToken = token;
    //         const deviceId = DeviceInfo.getUniqueID();
    //         services.saveDevice(emailid, deviceId, fcmToken).then((val) => { }, (error) => { });
    //       });
    //       if (Platform.OS === 'android') {
    //         ToastAndroid.showWithGravity(`welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //       } else if (Platform.OS === 'ios') {
    //         AlertIOS.alert(`welcome ${success.name}`);
    //       }
    //       this.setState({ isAvailable: false, email: '' });
    //       const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //           NavigationActions.navigate({ routeName: 'Drawer' }),
    //         ],
    //         key: 'Drawer',
    //       });
    //       this.props.navigation.dispatch(resetAction);
    //     } else {
    //       this.setState({ isAvailable: true, email: '' });
    //       const error = result.data;
    //       if (Platform.OS === 'android') {
    //         ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //       } else if (Platform.OS === 'ios') {
    //         AlertIOS.alert(error.message);
    //       }
    //     }
    //   }, (error) => {
    //     this.setState({ isAvailable: true, email: '' });
    //     if (Platform.OS === 'android') {
    //       ToastAndroid.showWithGravity('Enter Vaild Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //     } else if (Platform.OS === 'ios') {
    //       AlertIOS.alert('Enter Vaild Email');
    //     }
    //   });
    // } else {
    //   this.setState({ isAvailable: true, email: '' });
    //   if (Platform.OS === 'android') {
    //     ToastAndroid.showWithGravity('Enter Your Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //   } else if (Platform.OS === 'ios') {
    //     AlertIOS.alert('Enter Your Email');
    //   }
    // }
  }
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor: '#1e3750' }}>
        <StatusBar backgroundColor="#34495e" barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={{ height: 180 }} >
            <Image source={require('../../image/logo.jpg')} resizeMode="contain" style={style.logo} />
          </View>
          {this.state.isAvailable ? (<View style={style.content}>
            <Form>
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center', color: 'white' }}> Enter Your Email</Label>
                <Input style={{ color: 'white' }} value={this.state.email} onChangeText={(text) => { this.setState({ email: text }); }} />
              </Item>
              <Button rounded style={style.button} onPress={() => { this.handleSubmit(); }} >
                <Text style={{ alignSelf: 'center' }}>Go</Text>
              </Button>
            </Form>
          </View>) : (
            <ActivityIndicator animating color="#01579b" size="large" />
          )}
        </View>
      </View>
    );
  }
}
function mapToProps(state) {
  console.log(state);
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  onLogin: emailid => dispatch(action.userLoginRequest(emailid)),
});

export default connect(mapToProps, mapDispatchToProps)(MainPage);
