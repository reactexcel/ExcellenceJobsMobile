import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Thumbnail } from 'native-base';

export default class CustomHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Thumbnail small source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' }} />
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
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
