import React, { Component } from 'react';
import Root from './router';
import { BackHandler, Platform, ToastAndroid } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: false,
    };
  }
  componentDidMount(props) {
    if (Platform.OS !== 'ios') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
          if (this.state.id) {
            BackHandler.exitApp();
            return false;
          }
          this.setState({ id: true });
          ToastAndroid.showWithGravity('Press Again To Exit App', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        dispatch(NavigationActions.back());
        return true;
      });
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }
  render() {
    return (
      <Root
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

function mapStateToProps(state) {
  return { nav: state.nav };
}
export default connect(mapStateToProps)(AppNavigator);
