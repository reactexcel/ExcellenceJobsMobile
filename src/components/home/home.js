/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ListItem, Text, Body, Right, Icon } from 'native-base';
import { View, FlatList } from 'react-native';
import CustomHeader from '../header/header';
import style from './styles';

class HomePage extends Component {
  render() {
    return (
      <View style={style.mainContainer}>
        <CustomHeader name={this.props.username.name} onPress={() => this.props.drawerHandle()} />
        <View style={style.mainContainer}>
          <Text style={style.contentHeader}>
            Job Applied For - {this.props.username.subject}
          </Text>
          <View>
            <Text style={style.titleText}>
              Application Status
            </Text>
            <View style={style.viewBorder} />
          </View>
          <FlatList
            keyExtractor={item => item.text}
            data={this.props.userinfo}
            refreshing={this.props.refreshing}
            onRefresh={() => { this.props.handleRefresh(); }}
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
        </View>
      </View>
    );
  }
}

export default HomePage;
