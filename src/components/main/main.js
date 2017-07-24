import React, { Component } from 'react';
import { Image, View, AlertIOS, ActivityIndicator, Platform, ToastAndroid } from 'react-native';
import { Container, Content, Text, Body, Button, Form, Item, Input, Label } from 'native-base';

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
      this.setState({ isloading: false });
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
      <Container style={{ backgroundColor: 'white' }}>
        <Content>
          <View style={style.container}>
            <Text style={style.text}>
              HR Recruit
            </Text>
            <Image source={{ uri: 'http://recruit.excellencetechnologies.in/assets/logo.png' }} resizeMode="contain" style={style.logo} />
          </View>
          <View style={style.content}>
            <Item floatingLabel>
              <Label style={{ marginLeft: 5, justifyContent: 'center' }}> Enter Your Email.......</Label>
              <Input onChangeText={(text) => { this.setState({ email: text }); }} />
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
