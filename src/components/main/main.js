import React, { Component } from 'react';
import { Image, View, AlertIOS, AsyncStorage, Platform, ToastAndroid } from 'react-native';
import { Container, Content, Text, Button, Item, Input, Label } from 'native-base';

import * as data from '../../Api/data';
import style from './styles';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isloading: false,
    };
  }
  handleSubmit() {
    this.setState({ isloading: true });
    if (this.state.email === 'arun@gmail.com') {
      const success = data.SUCCESS;
      const email = { email: this.state.email };
      AsyncStorage.setItem('user', email);
      AsyncStorage.setItem('userdata', data);
      this.setState({ isloading: false });
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
      <Container style={{ backgroundColor: '#1e3750' }}>
        <Content>
          <View style={style.container}>
            <Image source={{ uri: 'http://recruit.excellencetechnologies.in/assets/logo.png' }} resizeMode="contain" style={style.logo} />
          </View>
          <View style={style.content}>
            <Item floatingLabel>
              <Label style={{ marginLeft: 5, justifyContent: 'center', color: 'white' }}> Enter Your Email.......</Label>
              <Input style={{ color: 'white' }} onChangeText={(text) => { this.setState({ email: text }); }} />
            </Item>
            <Button rounded style={style.button} onPress={() => { this.handleSubmit(); }} >
              <Text style={{ alignSelf: 'center' }}>Go</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
