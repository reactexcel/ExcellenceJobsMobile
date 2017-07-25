/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CustomHeader from '../header/header';
import { Container, Content, List, ListItem, Text, Body, Right, Icon } from 'native-base';
import { View, AsyncStorage } from 'react-native';
import style from './styles';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: '',
      username: '',
    };
    this._drawerHandle = this._drawerHandle.bind(this);
  }
  _drawerHandle() {
    this.props.navigation.navigate('DrawerOpen');
  }
  componentWillMount() {
    AsyncStorage.getItem('userdata', (err, result) => {
      const rounds = JSON.parse(result);
      // console.log(rounds.rounds);
      this.setState({ username: rounds });

      this.setState({ userinfo: rounds.rounds });
    });
  }
  render() {
    console.log(this.state.username);
    const items = this.state.userinfo.length > 0 ? this.state.userinfo.map((round, index) => (
      <ListItem key={index} style={round.status == '1' ? style.selectedlistitem : style.listitem} >
        <Body>
          <Text>{round.text}</Text>
          <Text note>{round.scheduled_date} {round.scheduled_date.length > 0 ? 'at' : null } {round.scheduled_time}</Text>
        </Body>
        {round.status == '1' ?
          <Right style={style.listright}>
            <Icon name="star" active style={style.selected} />
          </Right> : null}
      </ListItem>)) : null;
    return (
      <Container>
        <CustomHeader name={this.state.username.name} onPress={() => this._drawerHandle()} />
        <Content>
          <Text style={style.Contentheader}>
            Job Applied For - {this.state.username.subject}
          </Text>
          <View>
            <Text style={{ margin: 12, fontWeight: 'bold' }}>
              Application Status
            </Text>
          </View>
          {items}
        </Content>
      </Container>
    );
  }
}
