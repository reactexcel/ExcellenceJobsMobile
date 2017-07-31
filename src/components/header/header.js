import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Thumbnail } from 'native-base';
import style from './style';

export default class CustomHeader extends Component {
  render() {
    return (
      <Header androidStatusBarColor={STRING.PickledBluewood} style={style.headerColor}>
        <Left>
          <Thumbnail small source={require('../../image/avatar.png')} />
        </Left>
        <Body>
          <Title>
            <Text style={style.headerTitle}>{this.props.name}</Text>
          </Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon
              onPress={() => {
                this.props.onPress();
              }}
              name="menu"
            />
          </Button>
        </Right>
      </Header>
    );
  }
}
