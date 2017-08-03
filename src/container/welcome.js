/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import HomePage from '../components/home/home';
import * as action from '../action/actions';

class WelcomePage extends Component {
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
  _handleRefresh() {
    AsyncStorage.getItem('user', (err, result) => {
      this.setState({ refreshing: true });
      const user = JSON.parse(result);
      this.props.onLogin({ email: user.email, registrationid: user.registrationid });
    });
  }
  _onListItemPress(item) {
    const roundMark = this.state.isClicked;
    if (!roundMark && item.status == 1) {
      this.setState({ isClicked: true });
    } else if (roundMark && item.status == 1) {
      this.setState({ isClicked: false });
    }
  }
  render() {
    return (
      <HomePage
        userinfo={this.state.userinfo}
        username={this.state.username}
        refreshing={this.state.refreshing}
        isClicked={this.state.isClicked}
        onListItemPress={(item) => { this._onListItemPress(item); }}
        drawerHandle={() => { this._drawerHandle(); }}
        handleRefresh={() => { this._handleRefresh(); }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = dispatch => ({
  onLogin: (emailid, registrationid) => dispatch(action.userLoginRequest(emailid, registrationid)),
  onDeviceSave: (emailId, deviceId, token) => dispatch(action.deviceDataRequest(emailId, deviceId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
