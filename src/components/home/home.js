/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CustomHeader from '../header/header';
import { Container, Content, List, ListItem, Text, Body, Right } from 'native-base';
import { View } from 'react-native';
import style from './styles';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this._drawerHandle = this._drawerHandle.bind(this);
  }
  _drawerHandle() {
    this.props.navigation.navigate('DrawerOpen');
  }
  render() {
    const items = ['First Round', 'Second Round', 'Third Round'];
    return (
      <Container>
        <CustomHeader onPress={() => this._drawerHandle()} />
        <Content>
          <Text style={style.Contentheader}>
            ROUNDS
          </Text>

          <List
            dataArray={items}
            renderRow={item =>
              (<ListItem style={style.listitem} >
                <Body >
                  <Text>{item}</Text>
                  <Text note>20-July-2017</Text>
                </Body>
                <Right style={style.listright}>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>)
            }
          />
        </Content>
      </Container>
    );
  }
}
