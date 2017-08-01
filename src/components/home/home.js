/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Text, Body, Right, Icon } from 'native-base';
import { View, AsyncStorage, FlatList, TouchableWithoutFeedback } from 'react-native';
import CustomHeader from '../header/header';
import style from './styles';
import * as action from '../../action/actions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: '',
      username: '',
      refreshing: false,
      isClicked: false,
    };
    this._drawerHandle = this._drawerHandle.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
  }
  _drawerHandle() {
    this.props.navigation.navigate('DrawerOpen');
  }
  componentWillMount() {
    if (this.props.user.userLogin.isSuccess) {
      const userData = this.props.user.userLogin.data.data;
      this.setState({ username: userData, userinfo: userData.rounds });
    }
  }
  componentWillReceiveProps(props) {
    if (props.user.userLogin.isSuccess) {
      const success = props.user.userLogin.data.data;
      this.setState({ username: success, userinfo: success.rounds, refreshing: false });
    }
  }
  onListItemPress(item) {
    const roundMark = this.state.isClicked;
    if (!roundMark && item.status == 1) {
      this.setState({ isClicked: true });
    } else if (roundMark && item.status == 1) {
      this.setState({ isClicked: false });
    }
  }
  _handleRefresh() {
    AsyncStorage.getItem('user', (err, result) => {
      this.setState({ refreshing: true });
      const user = JSON.parse(result);
      this.props.onLogin({ email: user.email });
    });
  }
  render() {
    return (
      <View style={style.mainContainer}>
        <CustomHeader name={this.state.username.name} onPress={() => this._drawerHandle()} />
        <View style={style.mainContainer}>
          <Text style={style.contentHeader}>
            Job Applied For - {this.state.username.subject}
          </Text>
          <View>
            <Text style={style.titleText}>
              Application Status
            </Text>
            <View style={style.viewBorder} />
          </View>
          <FlatList
            keyExtractor={item => item.text}
            data={this.state.userinfo}
            refreshing={this.state.refreshing}
            onRefresh={() => { this._handleRefresh(); }}
            renderItem={({ item, index }) => (<View style={{ flex: 1 }}>
              <View >
                <ListItem key={index} onPress={() => { this.onListItemPress(item); }} style={item.status == '1' ? style.selectedlistitem : style.listitem} >
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
              {this.state.isClicked == true && item.status == '1' ? <View style={style.itemDetails}>
                <TouchableWithoutFeedback onPress={() => { this.onListItemPress(item); }}>
                  <View style={style.viewMargin}>
                    <Text style={style.jobtitle}>
                      Job Description
                    </Text>
                    <Text style={style.viewMargin}>
                      Here is job description for Designer Post
                    </Text>
                    <Text style={style.viewMargin}>
                      Here is job description for Designer Post
                      Exposure to develop next generation React Native apps with exciting possibilities on GeoLocation, Games, IoT integration etc.
                      Opportunity to work with full life cycle of app development
                      Work closely with creative and development team
                      Opportunity to offer solution in app development problems
                      You are passionate about programming, new technologies and solving problems. You are really serious about what and how you are learning
                      A minimum of one year of professional React Native experience
                      Have shipped few quality live Apps in App Store and Play Store.
                      Solid understanding of Mobile application development life cycle.
                      You are startup-minded, love open-source and working on complex products
                      Excellent knowledge in working with web APIs and communicating with teams.
                      Development experience with Native or Hybrid mobile apps especially capabilities, advantages and applicability of the Apps
                      You are an independent, task oriented professional and can handle pressures of working in product teams with timeline pressures.
                      Able to work both independently and collaboratively as needed.
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View> : null}
            </View>)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  onLogin: emailid => dispatch(action.userLoginRequest(emailid)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
