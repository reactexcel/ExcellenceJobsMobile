import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Thumbnail } from 'native-base';

export default class CustomHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Thumbnail small source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2fwk9JyQY3DPTvY5H8E_xE5Hu0wRYECzjS3sy0zYqut1cn5nLcK7PO0uu' }} />
        </Left>
        <Body>
          <Title>Hi,  Arun</Title>
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
