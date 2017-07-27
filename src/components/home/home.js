/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CustomHeader from '../header/header';
import { Container, Content, List, ListItem, Text, Body, Right, Icon } from 'native-base';
import { View, AsyncStorage, FlatList } from 'react-native';
import style from './styles';
import * as services from '../../Api/service';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: '',
      username: '',
      refreshing: false,
    };
    this._drawerHandle = this._drawerHandle.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
  }
  _drawerHandle() {
    this.props.navigation.navigate('DrawerOpen');
  }
  componentWillMount() {
    AsyncStorage.getItem('userdata', (err, result) => {
      const rounds = JSON.parse(result);
      this.setState({ username: rounds, userinfo: rounds.rounds });
    });
  }
  _handleRefresh() {
    AsyncStorage.getItem('user', (err, result) => {
      this.setState({ refreshing: true });
      const user = JSON.parse(result);
      services.getData(user.email).then((results) => {
        const success = results.data.data;
        this.setState({ username: success, userinfo: success.rounds, refreshing: false });
      });
    });
  }
  render() {
    // const items = this.state.userinfo.length > 0 ? this.state.userinfo.map((round, index) => (
    //   )) : null;
    console.log(this.state.userinfo);
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
            <View style={{ borderWidth: 0.17, borderColor: '#BDC3C7' }} />
          </View>
          <List>
            <FlatList
              keyExtractor={item => item.text}
              data={this.state.userinfo}
              refreshing={this.state.refreshing}
              onRefresh={() => { this._handleRefresh(); }}
              renderItem={({ item, index }) => (<ListItem key={index} style={item.status == '1' ? style.selectedlistitem : style.listitem} >
                <Body>
                  <Text>{item.text}</Text>
                  <Text note>{item.scheduled_date} {item.scheduled_date.length > 0 ? 'at' : null } {item.scheduled_time}</Text>
                </Body>
                {item.status == '1' ?
                  <Right style={style.listright}>
                    <Icon name="star" active style={style.selected} />
                  </Right> : null}
              </ListItem>)}
            />
          </List>
        </Content>
      </Container>
    );
  }
}
