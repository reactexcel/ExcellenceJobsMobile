/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ListItem, Text, Fab, Body, Right, Icon, Button } from 'native-base';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import CustomHeader from '../header/header';
import style from './styles';

class HomePage extends Component {
  render() {
    return (
      <View style={style.mainContainer}>
        <CustomHeader name={this.props.username.name} onPress={() => this.props.handleSignOut()} />
        <View style={style.mainContainer}>
          <Text style={style.contentHeader}>
            Registration ID : {this.props.username.registration_id}
          </Text>
          <View style={style.statusStyle}>
            <Text style={style.titleText}>
              Application Status
            </Text>
          </View>
          <FlatList
            keyExtractor={item => item.text}
            data={this.props.userinfo}
            refreshing={this.props.refreshing}
            onRefresh={() => { this.props.handleRefresh(); }}
            renderItem={({ item, index }) => (<View style={{ flex: 1 }}>
              <View >
                <ListItem key={index} onPress={() => { this.props.onListItemPress(item); }} style={item.status == '1' ? style.selectedlistitem : style.listitem} >
                  <Body>
                    <Text>{item.text}</Text>
                    <Text note>{item.scheduled_date} {item.scheduled_date.length > 0 ? 'at' : null } {item.scheduled_time}</Text>
                  </Body>
                  {item.status == '1' ?
                    <Right style={style.listright}>
                      <Icon name="star" active style={style.selected} />
                    </Right> : null}
                </ListItem>
              </View>
              {this.props.isClicked == true && item.status == '1' ? <View style={style.itemDetails}>
                <TouchableWithoutFeedback onPress={() => { this.props.onListItemPress(item); }}>
                  <View style={style.viewMargin}>
                    <Text style={style.jobtitle}>
                      Round Details
                    </Text>
                    <Text style={style.viewMargin} >{item.info}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View> : null}
            </View>)}
          />
          <View style={style.emailContainer}>
            {/* <TouchableWithoutFeedback onPress={() => { this.props.handleEmail(); }}>
              <View style={style.emailButton}>
              <Icon style={style.contactIcon} name="ios-mail-outline" />
              </View>
            </TouchableWithoutFeedback> */}
            <Button full style={style.callButton} onPress={() => { this.props.handleCall(); }} >
              <Icon name="ios-call-outline" style={style.contactIcon} />
              <Text style={style.contact} > Contact Us</Text>
            </Button>
            <View style={style.line} />
            <Button full style={style.callButton} onPress={() => { this.props.handleEmail(); }} >
              <Icon name="ios-mail-outline" style={style.contactIcon} />
              <Text style={style.contact} > Email Us</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default HomePage;
