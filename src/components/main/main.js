import React, { Component } from 'react';
import { Image, View, AlertIOS, AsyncStorage, Platform, ToastAndroid, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Label } from 'native-base';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import DeviceInfo from 'react-native-device-info';

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
  }
  componentWillMount() {
    this.setState({ isAvailable: false });
    AsyncStorage.getItem('user', (err, result) => {
      if (result !== null) {
        const user = JSON.parse(result);
        if (user.email !== '') {
          AsyncStorage.setItem('userdata', JSON.stringify(data.SUCCESS));
          this.props.navigation.navigate('Drawer', { data: data.SUCCESS });
        } else {
          this.setState({ isAvailable: true });
        }
      }
    });
  }
  handleSubmit() {
    this.setState({ isloading: true });
    // services.getData(this.state.email).then((result) => {
    //   if (result.data.error === 0) {
    //     const success = result.data.data;
    //     const email = { email: this.state.email };
    //     AsyncStorage.setItem('user', JSON.stringify(email));
    //     AsyncStorage.setItem('userdata', JSON.stringify(success));
    //     this.setState({ isloading: false, email: '' });
    //     FCM.getFCMToken().then((token) => {
    //       const fcmToken = token;
    //       const deviceId = DeviceInfo.getUniqueID();
    //       services.saveDevice(this.state.email, deviceId, fcmToken).then((val) => { }, (error) => { });
    //     });
    //     if (Platform.OS === 'android') {
    //       ToastAndroid.showWithGravity(`welcome ${success.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //     } else if (Platform.OS === 'ios') {
    //       AlertIOS.alert(`welcome ${success.name}`);
    //     }
    //     this.props.navigation.navigate('Drawer', { data: success });
    //   } else {
    //     this.setState({ isloading: false, email: '' });
    //     const error = result.data;
    //     if (Platform.OS === 'android') {
    //       ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //     } else if (Platform.OS === 'ios') {
    //       AlertIOS.alert(error.message);
    //     }
    //   }
    // }, (error) => {
    //   this.setState({ isloading: false });
    //   if (Platform.OS === 'android') {
    //     ToastAndroid.showWithGravity('Enter Vaild Email', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //   } else if (Platform.OS === 'ios') {
    //     AlertIOS.alert('Enter Vaild Email');
    //   }
    // });
    if (this.state.email === 'arun@gmail.com') {
      const success = data.SUCCESS;
      const email = { email: this.state.email };
      AsyncStorage.setItem('user', JSON.stringify(email));
      AsyncStorage.setItem('userdata', JSON.stringify(success));
      this.setState({ isloading: false, email: '' });
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(`welcome ${success.data.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(`welcome ${success.data.name}`);
      }
      this.props.navigation.navigate('Drawer', { data: success });
    } else {
      this.setState({ isloading: false, email: '' });
      const error = data.FAILED;
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(error.data.text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(error.data.text);
      }
    }
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
