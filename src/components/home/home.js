/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CustomHeader from '../header/header';
import { Container } from 'native-base';
import { View, Text } from 'react-native';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this._drawerHandle = this._drawerHandle.bind(this);
  }
  _drawerHandle() {
    this.props.navigation.navigate('DrawerOpen');
  }
  render() {
    return (
      <Container>
        <CustomHeader onPress={() => this._drawerHandle()} />
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>
            ROUNDS
          </Text>
        </View>
      </Container>
    );
  }
}
