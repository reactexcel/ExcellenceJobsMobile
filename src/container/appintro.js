import React, { Component } from 'react';
import AppInfo from '../components/appinfo/appinfo';
import { StatusBar, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { HEXCOLOR } from '../style/hexcolor';

export default class AppIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBarColor: '#D35400',
      index: 0,
    };
    this.handleDoneSkip = this.handleDoneSkip.bind(this);
    this.routesReset = this.routesReset.bind(this);
    this.onSlideChangeHandle = this.onSlideChangeHandle.bind(this);
  }
  routesReset(routeName) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName }),
      ],
      key: routeName,
    });
    this.props.navigation.dispatch(resetAction);
  }
  handleDoneSkip() {
    this.routesReset('Drawer');
  }
  onSlideChangeHandle(index) {
    if (index === 0) {
      this.setState({ statusBarColor: HEXCOLOR.DarkOrange, index });
    } else if (index === 1) {
      this.setState({ statusBarColor: HEXCOLOR.DarkBlue, index });
    } else if (index === 2) {
      this.setState({ statusBarColor: HEXCOLOR.DarkGreen, index });
    } else if (index === 3) {
      this.setState({ statusBarColor: HEXCOLOR.PickledBluewood, index });
    }
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor={this.state.statusBarColor} barStyle="light-content" />
        <AppInfo
          index={this.state.index}
          doneBtnHandle={() => { this.handleDoneSkip(); }}
          onSkipBtnHandle={() => { this.handleDoneSkip(); }}
          onSlideChangeHandle={this.onSlideChangeHandle}
        />
      </View>
    );
  }
}
