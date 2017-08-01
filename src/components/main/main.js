import React, { Component } from 'react';
import { Image, TextInput, View, AlertIOS, AsyncStorage, Platform, ToastAndroid, ActivityIndicator, AppState, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Label, Form } from 'native-base';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';
import style from './styles';
import * as services from '../../api/services';
import { HEXCOLOR } from '../../style/hexcolor';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      registrationid: '',
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
        if (user.email !== '' && user.registrationid !== '') {
          services.getData(user.email, user.registrationid).then((results) => {
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
    this.setState({ isAvailable: false });
    const emailid = this.state.email;
    const registrationid = this.state.registrationid;
    if (emailid !== '' && registrationid !== '') {
      services.getData(emailid, registrationid).then((result) => {
        if (result.data.error === 0) {
          const success = result.data.data;
          const data = { email: emailid, registrationid };
          AsyncStorage.setItem('user', JSON.stringify(data));
          AsyncStorage.setItem('userdata', JSON.stringify(success));
          FCM.getFCMToken().then((token) => {
            const fcmToken = token;
            const deviceId = DeviceInfo.getUniqueID();
            services.saveDevice(emailid, deviceId, fcmToken).then((val) => { }, (error) => { });
          });
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(`welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          } else if (Platform.OS === 'ios') {
            AlertIOS.alert(`welcome ${success.name}`);
          }
          this.setState({ isAvailable: false, email: '', registrationid: '' });
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Drawer' }),
            ],
            key: 'Drawer',
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({ isAvailable: true, email: '', registrationid: '' });
          const error = result.data;
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          } else if (Platform.OS === 'ios') {
            AlertIOS.alert(error.message);
          }
        }
      }, (error) => {
        this.setState({ isAvailable: true, email: '', registrationid: '' });
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity('Enter Vaild Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } else if (Platform.OS === 'ios') {
          AlertIOS.alert('Enter Vaild Email');
        }
      });
    } else {
      this.setState({ isAvailable: true, email: '', registrationid: '' });
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
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center', color: HEXCOLOR.WhiteColor }}> Registration Id </Label>
                <Input style={style.inputStyle} value={this.state.registrationid} onChangeText={(text) => { this.setState({ registrationid: text }); }} />
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
