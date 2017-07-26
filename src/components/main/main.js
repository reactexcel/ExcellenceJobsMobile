import React, { Component } from 'react';
import { Image, View, AlertIOS, AsyncStorage, Platform, ToastAndroid, ActivityIndicator, AppState } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Label } from 'native-base';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';

import style from './styles';
import * as services from '../../Api/service';
import * as data from '../../Api/data';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isloading: false,
      isAvailable: true,
    };
    this.handleNotification = this.handleNotification.bind(this);
    this.handleAppStatus = this.handleAppStatus.bind(this);
    this.foregroundListener = this.foregroundListener.bind(this);
    this.backgroundListener = this.backgroundListener.bind(this);
  }
  componentWillMount() {
    this.setState({ isAvailable: false });
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        const user = JSON.parse(result);
        if (user.email !== '') {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Drawer' }),
            ],
            key: 'Drawer',
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({ isAvailable: true });
        }
      } else {
        this.setState({ isAvailable: true });
      }
    });
    FCM.getInitialNotification().then((notif) => {
      if (notif && notif.body !== undefined) {
        this.handleNotification(notif);
      }
    });
    AppState.addEventListener('change', this.handleAppStatus);
  }
  handleNotification(data) {
    FCM.removeAllDeliveredNotifications(data);
    FCM.cancelAllLocalNotifications();
    const id = JSON.parse(data.body);
  // navigator.push({
  //   name: 'scrapproduct',
  //   payload: {
  //     id: id.id,
  //   },
  // });
  }
  handleAppStatus() {
    if (AppState.currentState === 'active') {
      if (this.state.back === false) {
        this.foregroundListener();
      }
    } else {
      this.backgroundListener();
      this.setState({ back: true });
    }
  }
  backgroundListener() {
    FCM.on(FCMEvent.Notification, (notif) => {
      if (AppState.currentState !== 'active' && notif && notif.body !== undefined && notif.body !== null) {
        this.handleNotification(notif);
      }
    });
  }
  foregroundListener() {
    FCM.on(FCMEvent.Notification, (notif) => {
      if (AppState.currentState === 'active' && notif && notif.body !== undefined && notif.body !== null) {
        this.state.notify.push(notif);
        // this.handleNotification(notif);
      }
    });
  }

  handleSubmit() {
    this.setState({ isloading: true });
    const emailid = this.state.email;
    services.getData(emailid).then((result) => {
      if (result.data.error === 0) {
        const success = result.data.data;
        const email = { email: emailid };
        AsyncStorage.setItem('user', JSON.stringify(email));
        AsyncStorage.setItem('userdata', JSON.stringify(success));
        FCM.getFCMToken().then((token) => {
          console.log(token);
          const fcmToken = token;
          const deviceId = DeviceInfo.getUniqueID();
          services.saveDevice(emailid, deviceId, fcmToken).then((val) => { }, (error) => { });
        });
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(`welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } else if (Platform.OS === 'ios') {
          AlertIOS.alert(`welcome ${success.name}`);
        }
        this.setState({ isloading: false, email: '' });
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Drawer' }),
          ],
          key: 'Drawer',
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.setState({ isloading: false, email: '' });
        const error = result.data;
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } else if (Platform.OS === 'ios') {
          AlertIOS.alert(error.message);
        }
      }
    }, (error) => {
      this.setState({ isloading: false });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity('Enter Vaild Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert('Enter Vaild Email');
      }
    });
  }
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: '#1e3750' }}>
        <Content>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: 'http://recruit.excellencetechnologies.in/assets/logo.png' }} resizeMode="contain" style={style.logo} />
          </View>
          {this.state.isAvailable ? (<View style={style.content}>
            <Item floatingLabel>
              <Label style={{ marginLeft: 5, justifyContent: 'center', color: 'white' }}> Enter Your Email.......</Label>
              <Input style={{ color: 'white' }} value={this.state.email} onChangeText={(text) => { this.setState({ email: text }); }} />
            </Item>
            <Button rounded style={style.button} onPress={() => { this.handleSubmit(); }} >
              <Text style={{ alignSelf: 'center' }}>Go</Text>
            </Button>
          </View>) : (
            <ActivityIndicator animating color="#01579b" size="large" />
          )}
        </Content>
      </Container>
    );
  }
}
