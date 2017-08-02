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
      this.props.onLogin({ email: user.email, registrationid: user.registrationid });
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
