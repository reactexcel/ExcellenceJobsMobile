import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Thumbnail } from 'native-base';

export default class CustomHeader extends Component {
  render() {
    return (
      <Header androidStatusBarColor="#34495e" style={{ backgroundColor: '#1e3750' }}>
        <Left>
          <Thumbnail small source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' }} />
        </Left>
        <Body>
          <Title>
            <Text style={{ color: 'white' }}>{this.props.name}</Text>
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
