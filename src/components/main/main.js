import React, { Component } from 'react';
import { Image, View, AlertIOS, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Body, Button, Form, Item, Input, Label } from 'native-base';

import style from './styles';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isloading: false,
    };
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
              <Label style={style.label}> Enter Your Email.......</Label>
              <Input />
            </Item>
            <Button rounded style={style.button}>
              <Text style={{ alignSelf: 'center' }}>Go</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
